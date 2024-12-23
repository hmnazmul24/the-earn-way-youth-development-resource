"use server";

import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/data/cloudinary_file_upload";

import { prisma } from "@/lib/db";

export const newNoticeAction = async ({ text }: { text: string }) => {
  try {
    await prisma.notice.create({
      data: {
        text,
      },
    });
    return { message: "success" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const allNoticeAction = async () => {
  try {
    let allNotice = await prisma.notice.findMany();

    return { allNotice };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const deleteNoticeAction = async (id: string) => {
  try {
    await prisma.notice.delete({ where: { id } });
    return { message: "notice has been deleted" };
  } catch (error) {
    return { error: "internal server error" };
  }
};

// for gallery image

export const addGalleryImgAction = async (formData: FormData) => {
  try {
    let text = JSON.parse(formData.get("imgText") as string);
    let imgFile = formData.get("imgFile") as string;

    if (text === "") {
      return { error: "text and img file both are required" };
    }

    let imgUrl = await uploadToCloudinary({
      file: imgFile,
      folder: "gallery",
    });

    // todo: upload

    await prisma.gallery.create({
      data: {
        text,
        secure_url: imgUrl.secure_url!,
        public_id: imgUrl.public_id!,
      },
    });
    return { message: "success" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const allGalleryImgAction = async () => {
  try {
    let allImg = await prisma.gallery.findMany();

    return { allImg };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const anyImgDeleteAction = async ({
  id,
  public_id,
}: {
  id: string;
  public_id: string;
}) => {
  try {
    await prisma.gallery.delete({ where: { id } });
    await deleteFromCloudinary(public_id);
    return { message: "deleted" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
// for payments

export const oneTimePaymentUpdate = async ({ amount }: { amount: string }) => {
  try {
    let exist = await prisma.oneTimePaymentForBranch.findMany();
    if (exist.length > 0 && exist[0].id !== "") {
      await prisma.oneTimePaymentForBranch.update({
        where: { id: exist[0].id },
        data: {
          price: amount,
        },
      });
    } else {
      await prisma.oneTimePaymentForBranch.create({
        data: {
          price: amount,
        },
      });
    }
    return { message: "updated", amount };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const oneTimePrice = async () => {
  try {
    let exist = await prisma.oneTimePaymentForBranch.findMany();
    if (exist.length > 0) {
      return { amount: exist[0].price };
    } else {
      return { amount: "0" };
    }
  } catch (error) {
    return { error: "internal server error" };
  }
};

export const AllowBranchWithoutPaymentAction = async (id: string) => {
  try {
    let isAllowed = await prisma.branch.findUnique({ where: { id } });
    if (isAllowed?.haveToPay === true) {
      await prisma.branch.update({
        where: { id },
        data: {
          haveToPay: false,
        },
      });
      return { message: "allowed" };
    } else {
      await prisma.branch.update({
        where: { id },
        data: {
          haveToPay: true,
        },
      });
      return { message: "payment permission denied" };
    }
  } catch (error) {
    return { error: "internal server error" };
  }
};
