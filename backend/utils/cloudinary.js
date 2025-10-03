import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});
export const uploadFile = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      }
    );
  });
};
export const deleteFile = async (file) => {
  try {
    const res = await cloudinary.uploader.destroy(file);
    if (res?.result === "ok") return true;
  } catch (error) {
    console.log(error);
  }
};
