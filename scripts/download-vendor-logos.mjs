import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as simpleIcons from 'simple-icons';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const mapPath = path.join(projectRoot, 'src/data/vendor-logo-map.json');
const outputDir = path.join(projectRoot, 'public/logos');
const vendorMap = JSON.parse(await fs.readFile(mapPath, 'utf8'));
const iconBySlug = new Map(
  Object.values(simpleIcons)
    .filter((item) => item && typeof item === 'object' && typeof item.slug === 'string' && item.svg)
    .map((item) => [item.slug, item])
);

await fs.mkdir(outputDir, { recursive: true });
let downloaded = 0;
const missing = [];

for (const [vendor, slug] of Object.entries(vendorMap)) {
  const icon = iconBySlug.get(slug);
  if (!icon) {
    missing.push(`${vendor} (slug: ${slug})`);
    continue;
  }

  // Keep the brand's official Simple Icons color in the local SVG asset.
  const svg = icon.svg.replace('<svg ', `<svg fill="#${icon.hex}" `);
  await fs.writeFile(path.join(outputDir, `${slug}.svg`), svg, 'utf8');
  downloaded += 1;
}

console.log(`Downloaded ${downloaded} unique SVG logo files to public/logos/.`);
if (missing.length) {
  console.log('\nNo matching Simple Icons asset was found for:');
  for (const name of missing) console.log(`- ${name}`);
  console.log('\nAdd these brands using their official brand asset, or leave the initials fallback in place.');
}
