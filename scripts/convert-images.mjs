import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = './public/images';
const QUALITY = 80; // Good quality, big size reduction

const files = fs.readdirSync(IMAGES_DIR);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  // Only convert PNG and JPG files (skip already-webp files)
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

  const inputPath = path.join(IMAGES_DIR, file);
  const outputName = path.basename(file, ext) + '.webp';
  const outputPath = path.join(IMAGES_DIR, outputName);

  // Skip if webp version already exists
  if (fs.existsSync(outputPath)) {
    console.log(`SKIP (exists): ${outputName}`);
    continue;
  }

  try {
    const inputSize = fs.statSync(inputPath).size;
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    const outputSize = fs.statSync(outputPath).size;
    const saved = Math.round((1 - outputSize / inputSize) * 100);
    console.log(`CONVERTED: ${file} (${Math.round(inputSize/1024)}KB) -> ${outputName} (${Math.round(outputSize/1024)}KB) [${saved}% smaller]`);
  } catch (err) {
    console.error(`FAILED: ${file}`, err.message);
  }
}

console.log('\nDone! Now update your code references from .png/.jpg to .webp');
