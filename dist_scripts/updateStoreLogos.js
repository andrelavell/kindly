"use strict";
const { stores, getStoreLogo } = require('../src/data/stores');
const cloudinaryUploader = require('./utils/cloudinaryUploader');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
async function copyStoresModule() {
    const srcPath = path.join(__dirname, '../src/data/stores.ts');
    const destDir = path.join(__dirname, '../dist_scripts/src/data');
    const destPath = path.join(destDir, 'stores.js');
    try {
        await fs.mkdir(destDir, { recursive: true });
        await fs.copyFile(srcPath, destPath);
        console.log('Successfully copied stores module to dist_scripts');
    }
    catch (error) {
        console.error('Error copying stores module:', error);
        throw error;
    }
}
async function isImageUrlValid(url) {
    try {
        const response = await axios.head(url, { timeout: 5000 });
        const contentType = response.headers['content-type'];
        return contentType?.startsWith('image/');
    }
    catch {
        return false;
    }
}
async function updateStoreLogo(store) {
    const result = {
        storeName: store.name,
        success: false,
    };
    try {
        const logoUrls = getStoreLogo(store);
        if (!logoUrls || logoUrls.length === 0) {
            result.error = 'No logo URLs found';
            return result;
        }
        let validLogoUrl = null;
        for (const url of logoUrls) {
            const isValid = await isImageUrlValid(url);
            if (isValid) {
                validLogoUrl = url;
                break;
            }
        }
        if (!validLogoUrl) {
            result.error = 'No valid logo URL found';
            return result;
        }
        const publicId = cloudinaryUploader.generateStoreLogoPublicId(store.name);
        const uploadResult = await cloudinaryUploader.uploadToCloudinary(validLogoUrl, publicId);
        if (uploadResult) {
            result.success = true;
            result.cloudinaryUrl = uploadResult.secure_url;
        }
        else {
            result.error = 'Failed to upload to Cloudinary';
        }
    }
    catch (error) {
        result.error = error instanceof Error ? error.message : 'Unknown error';
    }
    return result;
}
async function updateAllStoreLogos() {
    const results = [];
    for (const store of stores) {
        const result = await updateStoreLogo(store);
        if (result.success && result.cloudinaryUrl) {
            store.logo = result.cloudinaryUrl;
        }
        results.push(result);
        console.log(`Processed ${store.name}:`, result);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    try {
        await fs.writeFile(path.join(__dirname, '../src/data/stores.json'), JSON.stringify(stores, null, 2), 'utf-8');
        console.log('Successfully updated stores.json with Cloudinary URLs');
    }
    catch (error) {
        console.error('Error saving updated stores data:', error);
    }
    return results;
}
console.log('Starting store logo updates...');
copyStoresModule()
    .then(() => updateAllStoreLogos())
    .then(results => {
    console.log('\nStore Logo Update Results:');
    console.log(JSON.stringify(results, null, 2));
})
    .catch(error => {
    console.error('Error running script:', error);
});
