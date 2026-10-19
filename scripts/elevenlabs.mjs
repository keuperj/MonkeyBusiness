import { loadEnv } from 'vite';
const env = loadEnv('development', process.cwd(), '');
const key = process.env.ELEVENLABS_API_KEY || env.ELEVENLABS_API_KEY;
export async function api(path, body) {
  if (!key) throw new Error('ELEVENLABS_API_KEY is missing from the local environment.');
  const response = await fetch(`https://api.elevenlabs.io/v1/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'xi-api-key': key, ...(body ? {'Content-Type':'application/json'} : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(120000)
  });
  if (!response.ok) {
    // Never print request headers, credentials or full service responses.
    let status = '';
    try { status = (await response.json()).detail?.status || ''; } catch {}
    throw new Error(`ElevenLabs ${response.status} ${String(status).replace(/[^a-zA-Z0-9_]/g,'')}`);
  }
  return response;
}
