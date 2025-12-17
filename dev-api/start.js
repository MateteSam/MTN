// Start dev-api on a different port (3002) without changing existing scripts
process.env.PORT = process.env.PORT || '3002';

// Load a local .env file if present (simple KEY=VALUE parser). This allows devs to
// place PayFast credentials in a gitignored `.env.local` file for local testing.
import fs from 'fs';
import path from 'path';
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  try {
    const txt = fs.readFileSync(envPath, 'utf8');
    txt.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eq = trimmed.indexOf('=');
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      // remove optional quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    });
    console.log('[dev-api] loaded .env.local');
  } catch (err) {
    console.warn('[dev-api] could not load .env.local', err && err.message ? err.message : err);
  }
}

// Import the server which reads process.env.PORT and other envs
import('./server.js').then(m => {
  console.log('dev-api start wrapper set PORT=' + process.env.PORT);
}).catch(err => {
  console.error('Failed to start dev-api wrapper:', err);
  process.exit(1);
});
