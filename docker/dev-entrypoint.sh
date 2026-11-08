#!/bin/sh
set -eu
umask 077
# SAN is passed as a single OpenSSL argument, never evaluated as shell/config code.
san=${TLS_SAN:-DNS:localhost,IP:127.0.0.1}
if [ ! -f /certs/server.crt ] || [ ! -f /certs/server.key ] || \
   [ ! -f /certs/san ] || [ "$(cat /certs/san)" != "$san" ] || \
   ! openssl x509 -checkend 86400 -noout -in /certs/server.crt >/dev/null 2>&1; then
    echo 'Generating a development-only self-signed TLS certificate.'
    openssl req -x509 -newkey rsa:2048 -sha256 -nodes -days 30 \
        -subj '/CN=Monkey Business development' \
        -addext "subjectAltName=$san" \
        -addext 'extendedKeyUsage=serverAuth' \
        -keyout /certs/server.key.new -out /certs/server.crt.new
    mv /certs/server.key.new /certs/server.key
    mv /certs/server.crt.new /certs/server.crt
    printf '%s' "$san" > /certs/san
fi
# Reuse the production server rules, changing only its listener and TLS settings.
sed 's/listen 8080;/listen 8443 ssl;\n        ssl_certificate \/certs\/server.crt;\n        ssl_certificate_key \/certs\/server.key;\n        ssl_protocols TLSv1.2 TLSv1.3;/' \
    /etc/nginx/nginx.conf > /tmp/nginx-dev.conf
nginx -t -e stderr -c /tmp/nginx-dev.conf
exec nginx -e stderr -c /tmp/nginx-dev.conf -g 'daemon off;'