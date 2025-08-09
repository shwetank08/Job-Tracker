import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("Uploaded type:", response.resource_type);
    console.log("file uploaded successfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the operation failed.
    throw error
  }
};

export const deleteFromCloudinary = async(public_id) => {
  try{
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "image"
    })
    return result;
  }catch(err){
    throw err;
  }
}