const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetImages = [
  'images/impact/clean-water.jpg'
];

async function compressImage(imagePath) {
  const publicDir = path.join(process.cwd(), 'public');
  const inputPath = path.join(publicDir, imagePath);
  const outputPath = inputPath.replace('.jpg', '.webp');
  
  try {
    await sharp(inputPath)
      .jpeg({ 
        quality: 60,
        chromaSubsampling: '4:2:0'
      })
      .resize(1600, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .toFile(inputPath + '.tmp');
    
    // Replace original with compressed version
    fs.unlinkSync(inputPath);
    fs.renameSync(inputPath + '.tmp', inputPath);
    
    const newSize = fs.statSync(inputPath).size;
    console.log(`  Final size: ${(newSize / 1024 / 1024).toFixed(2)}MB`);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
    
    console.log(`✓ Compressed ${imagePath}`);
    console.log(`  Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  Compressed: ${(newSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  Saved: ${savings}%\n`);
  } catch (error) {
    console.error(`✗ Error compressing ${imagePath}:`, error.message);
  }
}

async function main() {
  console.log('Starting image compression...\n');
  
  for (const image of targetImages) {
    await compressImage(image);
  }
  
  console.log('Image compression complete!');
}

main().catch(console.error);
