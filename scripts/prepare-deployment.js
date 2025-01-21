const fs = require('fs-extra');
const path = require('path');

async function prepareDeployment() {
  const projectRoot = path.resolve(__dirname, '..');
  const nextDir = path.join(projectRoot, '.next');
  const publicDir = path.join(projectRoot, 'public');
  const standaloneDir = path.join(nextDir, 'standalone');
  const deployDir = path.join(projectRoot, '.deploy');

  // Clean up old deployment directory if it exists
  await fs.remove(deployDir);

  // Copy the standalone build
  await fs.copy(standaloneDir, deployDir);

  // Copy public directory
  await fs.copy(publicDir, path.join(deployDir, 'public'));

  // Copy .next/static to .next/standalone/.next/static
  await fs.copy(
    path.join(nextDir, 'static'),
    path.join(deployDir, '.next', 'static')
  );

  console.log('Deployment files prepared successfully!');
}

prepareDeployment().catch(console.error);
