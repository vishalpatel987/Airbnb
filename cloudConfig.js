// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'Wanderlust-Dev',
//         allowerdFormats:["png","jpeg","jpg"],
      
//     },
// });

// module.exports = {
//     cloudinary,
//     storage
// }


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Storage Setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "listings",
        allowed_formats: ['jpeg', 'png', 'jpg']
    }
});

// Upload Middleware
const upload = multer({ storage });

console.log("✅ cloudConfig.js loaded successfully!"); // ✅ Debug log

module.exports = { cloudinary, storage, upload };


