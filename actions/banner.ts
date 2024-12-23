"use server";

import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/data/cloudinary_file_upload";
import { prisma } from "@/lib/db";

export const addBannerAction = async (formData: FormData) => {
  try {
    let imgFile = formData.get("imgFile") as string;

    let imgUrl = await uploadToCloudinary({
      file: imgFile,
      folder: "banner",
    });

    // todo: upload

    await prisma.heroBanner.create({
      data: {
        secure_url: imgUrl.secure_url!,
        public_id: imgUrl.public_id!,
      },
    });
    return { message: "success" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const allBannersAction = async () => {
  try {
    let allImg = await prisma.heroBanner.findMany();

    return { allImg };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const anyBannerDeleteAction = async ({
  id,
  public_id,
}: {
  id: string;
  public_id: string;
}) => {
  try {
    await prisma.heroBanner.delete({ where: { id } });
    await deleteFromCloudinary(public_id);
    return { message: "deleted" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
