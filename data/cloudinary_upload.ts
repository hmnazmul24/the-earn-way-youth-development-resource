"use server";

import { ImageUrlType } from "@/types";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadtoCloud = async ({
  file,
  folder,
}: {
  file: File;
  folder: "student" | "branch" | "gallery";
}): Promise<ImageUrlType> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const data = new Promise<ImageUrlType>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: `/${folder}` },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error); // Log the error
            reject({
              secure_url: "",
              public_id: "",
            });
          } else {
            resolve({
              public_id: result!.public_id,
              secure_url: result!.secure_url.endsWith(".pdf")
                ? result!.secure_url.replace(".pdf", ".jpg")
                : result!.secure_url,
            });
          }
        }
      );
      stream.end(buffer);
    });

    return await data;
  } catch (error) {
    console.error("Upload to Cloudinary failed:", error); // Log the error
    throw new Error("Failed to upload file to Cloudinary.");
  }
};

// Delete image from Cloudinary
export const deleteFromCloud = async (publicId: string) => {
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
