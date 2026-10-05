import { mkdir, copyFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const webDir = resolve(rootDir, 'www');
const filesToCopy = ['index.html', 'manifest.webmanifest', 'icon.svg'];

await mkdir(webDir, { recursive: true });

for (const file of filesToCopy) {
  await copyFile(resolve(rootDir, file), resolve(webDir, file));
}

console.log(`Prepared ${filesToCopy.length} web asset(s) in ${webDir}`);
