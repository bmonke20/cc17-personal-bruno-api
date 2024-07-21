const cloudinary = require("../config/cloudinary/cloudinary");

const uploadService = {};

uploadService.upload = async (path) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(path);
    return secure_url;
  } catch (err) {
    console.log("Cannot upload", err);
  }
};

module.exports = uploadService;
