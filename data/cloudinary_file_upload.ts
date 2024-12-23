"use server";

import { ImageUrlType } from "@/types";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async ({
  file,
  folder,
}: {
  file: string;
  folder: "student" | "branch" | "gallery" | "banner" | "employee" | "team";
}) => {
  try {
    let data = await cloudinary.uploader.upload(file, { folder });
    return { secure_url: data.secure_url, public_id: data.public_id };
  } catch (error) {
    console.error("upload error", error);
    return { error: "error occurs" };
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error || result.result !== "ok") {
        reject(new Error("Failed to delete image."));
      } else {
        resolve(result);
      }
    });
  });
};
