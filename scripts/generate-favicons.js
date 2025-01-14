const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SVG_PATH = path.join(PUBLIC_DIR, 'favicon.svg');

async function generateFavicons() {
  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(SVG_PATH);

    // Generate different sizes
    const sizes = {
      'favicon-16x16.png': 16,
      'favicon-32x32.png': 32,
      'apple-touch-icon.png': 180,
      'favicon.png': 32  // This will serve as our main favicon
    };

    for (const [filename, size] of Object.entries(sizes)) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(PUBLIC_DIR, filename));
      console.log(`Generated ${filename}`);
    }

    console.log('All favicon files generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
