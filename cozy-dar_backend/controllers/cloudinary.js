require('dotenv').config()
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});
const uploadImages = async (imagePaths) => {
    try {
        const image_urls=[];
        for(const imagePath of imagePaths){
            const result = await cloudinary.uploader.upload(imagePath);
            image_urls.push(result.secure_url);
        }
        return image_urls;
    } catch (error) {
        console.error(error);
    }
};

module.exports = uploadImages;
