// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log(cloudinary.config())

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'temple_app_uploads', // Cloudinary mein folder ka naam
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

export { storage, cloudinary };