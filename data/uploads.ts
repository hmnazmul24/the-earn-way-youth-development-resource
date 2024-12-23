import path from "path";
import fs from "fs";
import { v4 } from "uuid";

export const uploadBranchFile = async (file: File) => {
  const uploadDir = path.join(process.cwd(), "public/uploads/branch");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let uu_id = v4();
  let fileExtention = `${uu_id}.${file.name.split(".").pop()}`;
  let filePath = path.join(uploadDir, fileExtention);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  let url = `/uploads/branch/${fileExtention}`;
  return { url };
};

// for upload students file

export const uploadStudentFile = async ({
  file,
  type,
}: {
  file: File;
  type: "profile" | "registration" | "gallery";
}) => {
  let uploadUrl =
    type === "profile"
      ? "public/uploads/students"
      : type === "registration"
      ? "public/uploads/registrationCard"
      : "public/uploads/gallery";
  const uploadDir = path.join(process.cwd(), uploadUrl);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let uu_id = v4();
  let fileExtention = `${uu_id}.${file.name.split(".").pop()}`;
  let filePath = path.join(uploadDir, fileExtention);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  if (type === "profile") {
    let profileUrl = `/uploads/students/${fileExtention}`;
    return { profileUrl };
  } else if (type === "registration") {
    let regUrl = `/uploads/registrationCard/${fileExtention}`;
    return { regUrl };
  } else {
    let galleryImgUrl = `/uploads/gallery/${fileExtention}`;
    return { galleryImgUrl };
  }
};

export const deleteStudentFile = async (url: string) => {
  // Determine the base upload directory
  const baseDir = path.join(process.cwd(), "public/uploads");

  // Create the full file path
  const filePath = path.join(baseDir, url.replace("/uploads/", ""));

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Delete the file
    fs.unlinkSync(filePath);
    return { success: true };
  } else {
    return { success: false };
  }
};
