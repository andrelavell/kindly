const fs = require('fs-extra');
const path = require('path');

async function copyPublicToStandalone() {
  const publicDir = path.join(process.cwd(), 'public');
  const standalonePublicDir = path.join(process.cwd(), '.next/standalone/public');

  try {
    // Ensure the standalone/public directory exists
    await fs.ensureDir(standalonePublicDir);

    // Copy the entire public directory to standalone
    await fs.copy(publicDir, standalonePublicDir, {
      overwrite: true,
      recursive: true
    });

    console.log('Successfully copied public directory to standalone build');
  } catch (error) {
    console.error('Error copying public directory:', error);
    process.exit(1);
  }
}

copyPublicToStandalone();
