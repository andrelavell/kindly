"use strict";
require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');
class CloudinaryUploader {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
    }
    async uploadToCloudinary(imageUrl, publicId) {
        try {
            try {
                const existingImage = await cloudinary.api.resource(publicId);
                if (existingImage) {
                    return {
                        secure_url: existingImage.secure_url,
                        public_id: existingImage.public_id,
                    };
                }
            }
            catch {
            }
            const result = await cloudinary.uploader.upload(imageUrl, {
                public_id: publicId,
                folder: 'store-logos',
                overwrite: false,
            });
            return {
                secure_url: result.secure_url,
                public_id: result.public_id,
            };
        }
        catch (error) {
            console.error(`Error uploading image to Cloudinary:`, error);
            return null;
        }
    }
    generateStoreLogoPublicId(storeName) {
        return `store-logos/${storeName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    }
}
module.exports = new CloudinaryUploader();
