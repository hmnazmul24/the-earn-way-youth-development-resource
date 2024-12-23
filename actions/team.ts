"use server";

import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/data/cloudinary_file_upload";
import { prisma } from "@/lib/db";

export const addTeamInfoAction = async (formData: FormData) => {
  try {
    let name = JSON.parse(formData.get("name") as string);
    let title = JSON.parse(formData.get("title") as string);
    let order = Number(formData.get("order"));

    let imgFile = formData.get("imgFile") as string;

    if (!name || !title) {
      return { error: "all the fields are required" };
    }

    let imgUrl = await uploadToCloudinary({
      file: imgFile,
      folder: "team",
    });

    // todo: upload

    let data = await prisma.team.create({
      data: {
        name,
        title,
        order,
        secure_url: imgUrl.secure_url!,
        public_id: imgUrl.public_id!,
      },
    });

    return { message: "success" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const allTeamInfoAction = async () => {
  try {
    let allImg = await prisma.team.findMany();

    return { allImg };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const deleteTeamInfoAction = async ({
  id,
  public_id,
}: {
  id: string;
  public_id: string;
}) => {
  try {
    await prisma.team.delete({ where: { id } });
    await deleteFromCloudinary(public_id);
    return { message: "deleted" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
