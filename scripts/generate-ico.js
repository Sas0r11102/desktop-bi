import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const iconsDir = join(projectRoot, 'icons');

console.log('🎨 Generating ICO file from PNGs...\n');

async function generateIco() {
  const pngFiles = [
    join(iconsDir, 'icon-16.png'),
    join(iconsDir, 'icon-32.png'),
    join(iconsDir, 'icon-64.png'),
    join(iconsDir, 'icon-128.png'),
    join(iconsDir, 'icon-256.png'),
  ];
  
  const icoBuffer = await pngToIco(pngFiles);
  const outputPath = join(iconsDir, 'icon.ico');
  
  writeFileSync(outputPath, icoBuffer);
  
  console.log('✅ Generated: icon.ico');
  console.log('📦 ICO generation complete!');
}

generateIco().catch(err => {
  console.error('❌ Error generating ICO:', err);
  process.exit(1);
});
