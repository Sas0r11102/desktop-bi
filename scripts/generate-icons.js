import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const iconsDir = join(projectRoot, 'icons');

// Create icons directory if not exists
mkdirSync(iconsDir, { recursive: true });

// Read SVG
const svgPath = join(iconsDir, 'icon.svg');
const svgBuffer = readFileSync(svgPath);

// Define sizes needed for different platforms
const sizes = [
  { name: 'icon-16.png', size: 16 },
  { name: 'icon-32.png', size: 32 },
  { name: 'icon-64.png', size: 64 },
  { name: 'icon-128.png', size: 128 },
  { name: 'icon-256.png', size: 256 },
  { name: 'icon-512.png', size: 512 },
];

console.log('🎨 Generating PNG icons from SVG...\n');

async function generateIcons() {
  for (const { name, size } of sizes) {
    const outputPath = join(iconsDir, name);
    
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated: ${name} (${size}x${size})`);
  }
  
  console.log('\n📦 Icon generation complete!');
  console.log(`📁 Output directory: ${iconsDir}`);
}

generateIcons().catch(err => {
  console.error('❌ Error generating icons:', err);
  process.exit(1);
});
