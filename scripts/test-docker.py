"""Opt-in container smoke tests; requires Docker and prebuilt images.

python scripts/test-docker.py [production-image] [development-image]
Defaults: monkey-business:local and monkey-business:dev.
Only temporary test containers/volumes are removed. No external Python packages.
"""
import json
import ssl
import subprocess
import sys
import time
import urllib.error
import urllib.request
import uuid

production = sys.argv[1] if len(sys.argv)>1 else 'monkey-business:local'
development = sys.argv[2] if len(sys.argv)>2 else 'monkey-business:dev'
prefix = 'monkey-test-' + uuid.uuid4().hex[:10]
volume = prefix + '-certs'
containers = []

def docker(*args):
    return subprocess.check_output(['docker', *args], text=True).strip()

def start(image, name, port, san=None):
    args=['run','-d','--name',name,'--read-only','--tmpfs','/tmp:rw,noexec,nosuid,size=32m',
          '--cap-drop','ALL','--security-opt','no-new-privileges:true','-p',f'127.0.0.1::{port}']
    if san:
        args += ['-e', f'TLS_SAN={san}', '-v', f'{volume}:/certs']
    containers.append(name)
    docker(*args,image)
    hostport=json.loads(docker('inspect',name))[0]['NetworkSettings']['Ports'][f'{port}/tcp'][0]['HostPort']
    return f'{"https" if san else "http"}://127.0.0.1:{hostport}'

def fetch(base,path=''):
    # Deliberate test-only bypass: inspect generated certificate separately below.
    return urllib.request.urlopen(base+'/'+path,context=ssl._create_unverified_context(),timeout=5)

def check(name,base,debug):
    for attempt in range(60):
        try:
            with fetch(base) as response:
                assert response.status==200
            break
        except (OSError, urllib.error.URLError):
            time.sleep(.5)
    else:
        raise AssertionError(docker('logs',name))
    for path in ['','act2.html','act3.html','act4.html','act5.html']:
        with fetch(base,path) as response:
            assert response.status==200
            assert response.headers['Cache-Control']=='no-cache'
    with fetch(base,'debug-start.json') as response:
        assert json.load(response)['enabled'] is debug
    for path in ['.env','missing-asset.png']:
        try:
            fetch(base,path)
        except urllib.error.HTTPError as error:
            assert error.code in [403,404]
        else:
            raise AssertionError('Unexpectedly served '+path)
    manifest=json.load(fetch(base,'chapter-assets.json'))
    with fetch(base,manifest['assets'][0]['path']) as response:
        assert response.status==200
    assert docker('exec',name,'id','-u')=='10001'
    for attempt in range(75):
        state=json.loads(docker('inspect',name))[0]['State']['Health']['Status']
        if state=='healthy':break
        time.sleep(.5)
    assert state=='healthy',state
    print('PASS:',name,'pages, asset, debug setting, non-root and health check',flush=True)

def fingerprint(name):
    return docker('exec',name,'openssl','x509','-in','/certs/server.crt','-noout','-fingerprint','-sha256')

try:
    docker('volume','create',volume)
    check(prefix+'-http',start(production,prefix+'-http',8080),False)
    name=prefix+'-tls'
    check(name,start(development,name,8443,'DNS:localhost,IP:127.0.0.1'),True)
    cert=docker('exec',name,'openssl','x509','-in','/certs/server.crt','-noout','-ext','subjectAltName')
    assert 'DNS:localhost' in cert and 'IP Address:127.0.0.1' in cert
    assert docker('exec',name,'stat','-c','%a','/certs/server.key')=='600'
    first=fingerprint(name)
    docker('rm','-f',name);containers.remove(name)
    check(name,start(development,name,8443,'DNS:localhost,IP:127.0.0.1'),True)
    assert fingerprint(name)==first
    docker('rm','-f',name);containers.remove(name)
    check(name,start(development,name,8443,'DNS:test.local,IP:127.0.0.1'),True)
    assert fingerprint(name)!=first
    print('PASS: certificate SAN, private key mode, persistence and SAN rotation',flush=True)
finally:
    for name in containers:
        subprocess.run(['docker','rm','-f',name],check=False,stdout=subprocess.DEVNULL)
    subprocess.run(['docker','volume','rm',volume],check=False,stdout=subprocess.DEVNULL)