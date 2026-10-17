import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const publicDir = path.join(root, 'public');
const sourceExts = new Set(['.ts','.tsx','.js','.jsx','.css','.html','.json','.mjs']);
const forbiddenFiles = [];
const forbiddenReferences = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules','.next','.git'].includes(entry.name)) continue;
      walk(full);
      continue;
    }
    if (/\.jfif$/i.test(entry.name)) forbiddenFiles.push(path.relative(root, full));
    if (sourceExts.has(path.extname(entry.name).toLowerCase())) {
      const content = fs.readFileSync(full, 'utf8');
      if (/\.jfif(?:[?#'"\s)]|$)/i.test(content)) forbiddenReferences.push(path.relative(root, full));
    }
  }
}
walk(root);
if (forbiddenFiles.length || forbiddenReferences.length) {
  console.error('JFIF asset audit failed.');
  if (forbiddenFiles.length) console.error('Files:', forbiddenFiles);
  if (forbiddenReferences.length) console.error('References:', forbiddenReferences);
  process.exit(1);
}
console.log('JFIF audit passed: no JFIF files or code references found.');
