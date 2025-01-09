const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Files to remove
const filesToRemove = [
  // Charity directory pages
  'src/pages/[charity-slug].tsx',
  'src/pages/charity-directory.tsx',
  'src/pages/dev/charities-list.tsx',
  'src/pages/internal/all-charities.tsx',
  
  // Types and utils
  'src/types/charity.ts',
  'src/utils/typesense.ts',
  
  // Scripts
  'scripts/add-search-keywords.ts',
  'scripts/sync-charities.ts',
  'scripts/sync-irs-data.ts',
  'scripts/import-to-typesense.ts',
  'scripts/update-charity-fields.ts',
  'scripts/update-charity-tokens.ts',
  'scripts/update-tokens.js'
];

// Directories to remove
const dirsToRemove = [
  'src/pages/charity-directory',
  'typesense-data'
];

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, 'service-account-key.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function cleanup() {
  console.log('Starting cleanup process...');

  // 1. Remove files
  console.log('\nRemoving files...');
  for (const file of filesToRemove) {
    const fullPath = path.join(__dirname, '..', file);
    try {
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log(`✓ Removed ${file}`);
      } else {
        console.log(`- Skipped ${file} (not found)`);
      }
    } catch (error) {
      console.error(`× Error removing ${file}:`, error.message);
    }
  }

  // 2. Remove directories
  console.log('\nRemoving directories...');
  for (const dir of dirsToRemove) {
    const fullPath = path.join(__dirname, '..', dir);
    try {
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`✓ Removed ${dir}`);
      } else {
        console.log(`- Skipped ${dir} (not found)`);
      }
    } catch (error) {
      console.error(`× Error removing ${dir}:`, error.message);
    }
  }

  // 3. Clean up Firebase charities collection
  console.log('\nCleaning up Firebase charities collection...');
  try {
    const batchSize = 500;
    const collectionRef = db.collection('charities');
    
    while (true) {
      const snapshot = await collectionRef.limit(batchSize).get();
      
      if (snapshot.empty) {
        break;
      }

      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      
      console.log(`✓ Deleted batch of ${snapshot.size} charity documents`);
      
      if (snapshot.size < batchSize) {
        break;
      }
    }
    console.log('✓ Finished cleaning up charities collection');
  } catch (error) {
    console.error('× Error cleaning up Firebase:', error.message);
  }

  // 4. Update package.json to remove unnecessary dependencies
  console.log('\nUpdating package.json...');
  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    const depsToRemove = ['typesense', 'xml2js', 'csv-parse', '@types/xml2js'];
    
    depsToRemove.forEach(dep => {
      if (packageJson.dependencies?.[dep]) {
        delete packageJson.dependencies[dep];
        console.log(`✓ Removed dependency: ${dep}`);
      }
      if (packageJson.devDependencies?.[dep]) {
        delete packageJson.devDependencies[dep];
        console.log(`✓ Removed dev dependency: ${dep}`);
      }
    });
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✓ Updated package.json');
  } catch (error) {
    console.error('× Error updating package.json:', error.message);
  }

  console.log('\nCleanup completed!');
  process.exit(0);
}

// Run cleanup if this file is run directly
if (require.main === module) {
  cleanup().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
