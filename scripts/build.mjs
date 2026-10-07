import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
const template = await readFile(path.join(root, 'src/index.html'), 'utf8');
await mkdir(out, { recursive: true });
await writeFile(path.join(out, 'index.html'), template);
for (const file of ['styles.css', 'app.js', 'favicon.svg']) {
  await cp(path.join(root, 'src', file), path.join(out, file));
}
await cp(path.join(root, 'public/optimized'), path.join(out, 'images'), { recursive: true });
// Remove the retired generated download; keep main.txt as the original content reference.
await rm(path.join(out, 'pidato.txt'), { force: true });
console.log('Build selesai: dist/ (HTML statis, tanpa dependency runtime).');
