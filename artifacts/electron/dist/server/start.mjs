import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const LOG_FILE = process.env.LOG_FILE;

function ts() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

function writeLog(msg) {
  const line = '[' + ts() + '] ' + msg;
  _origStderr(line + '\n');
  if (LOG_FILE) {
    try {
      mkdirSync(dirname(LOG_FILE), { recursive: true });
      writeFileSync(LOG_FILE, line + '\n', { flag: 'a' });
    } catch {}
  }
}

// Pino (production) writes one JSON object per stdout.write call.
// Intercept stdout so every pino line is reformatted as a human-readable
// timestamped string — no worker threads, no pino-pretty needed.
const PINO_LEVELS = { 10:'TRACE', 20:'DEBUG', 30:'INFO', 40:'WARN', 50:'ERROR', 60:'FATAL' };

function formatPinoChunk(chunk) {
  const str = typeof chunk === 'string' ? chunk : (Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk));
  return str.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed) return line;
    try {
      const obj = JSON.parse(trimmed);
      if (obj && typeof obj.level === 'number') {
        const level = PINO_LEVELS[obj.level] || String(obj.level);
        const msg   = obj.msg ?? '';
        const extra = obj.err
          ? ' ' + (obj.err.stack || obj.err.message || JSON.stringify(obj.err))
          : '';
        return '[' + ts() + '] ' + level + ' ' + msg + extra;
      }
    } catch {}
    return '[' + ts() + '] ' + trimmed;
  }).join('\n');
}

const _origStdout = process.stdout.write.bind(process.stdout);
const _origStderr = process.stderr.write.bind(process.stderr);

// Stamp pino JSON on stdout; use raw stderr for writeLog (already stamped above)
process.stdout.write = function(chunk, enc, cb) {
  return _origStdout(formatPinoChunk(chunk), enc, cb);
};

// Patch console.* (engine/webClient etc.) so they also get timestamps
const _writeConsole = (stream, args) => stream('[' + ts() + '] ' + args.map(String).join(' ') + '\n');
console.log   = (...a) => _writeConsole(_origStdout, a);
console.info  = (...a) => _writeConsole(_origStdout, a);
console.warn  = (...a) => _writeConsole(_origStderr, a);
console.error = (...a) => _writeConsole(_origStderr, a);

process.on('uncaughtException', (err) => {
  writeLog('UNCAUGHT: ' + (err && err.stack ? err.stack : String(err)));
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  writeLog('UNHANDLED: ' + (reason && reason.stack ? reason.stack : String(reason)));
  process.exit(1);
});

writeLog('server-start: loading index.mjs');

try {
  await import('./index.mjs');
} catch (err) {
  writeLog('IMPORT ERROR: ' + (err && err.stack ? err.stack : String(err)));
  process.exit(1);
}
