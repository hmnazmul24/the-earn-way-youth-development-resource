"use server";

import { hashedPassword, jwtDecode } from "@/data/auth";
import { uploadToCloudinary } from "@/data/cloudinary_file_upload";
import { uploadtoCloud } from "@/data/cloudinary_upload";
import sendCredentialMail from "@/data/sendCredentialMail";
import { uploadBranchFile } from "@/data/uploads";
import { prisma } from "@/lib/db";
import {
  BranchInfo,
  BranchSchema,
  MoreInfo,
  PersonalInfo,
} from "@/Schema/branchSchema";
import { cookies } from "next/headers";

export const CreateBranchAction = async (formData: FormData) => {
  try {
    const branchInfo = JSON.parse(
      formData.get("branchInfo") as string
    ) as BranchInfo;
    const personalInfo = JSON.parse(
      formData.get("personalInfo") as string
    ) as PersonalInfo;
    const moreInfo = JSON.parse(formData.get("moreInfo") as string) as MoreInfo;

    const { nationalIDCard, ppSizePhoto, signature, tradeLicense } = {
      ppSizePhoto: formData.get("ppSizePhoto") as string,
      tradeLicense: formData.get("tradeLicense") as string,
      nationalIDCard: formData.get("nationalIDCard") as string,
      signature: formData.get("signature") as string,
    };
    let BranchInfo = { branchInfo, personalInfo, moreInfo };
    const result = BranchSchema.safeParse(BranchInfo);
    if (result.error) {
      return { error: result.error.format() };
    }
    if (ppSizePhoto === "empty")
      return { error: "pasport size image is required" };
    if (tradeLicense === "empty") return { error: "trade licence is required" };
    if (nationalIDCard === "empty") return { error: "NID card is required" };
    if (signature === "empty") return { error: "signature image is required" };

    /// upload the images

    let passportImg = await uploadToCloudinary({
      file: ppSizePhoto!,
      folder: "branch",
    });
    let nidImage = await uploadToCloudinary({
      file: nationalIDCard!,
      folder: "branch",
    });
    let signatureImg = await uploadToCloudinary({
      file: signature!,
      folder: "branch",
    });
    let licenceImg = await uploadToCloudinary({
      file: tradeLicense!,
      folder: "branch",
    });
    // checking the vlidation
    let isEmailExist = await prisma.branchInfo.findFirst({
      where: {
        branchEmail: branchInfo.branchEmail,
      },
    });
    if (isEmailExist) {
      return { error: "Email address is already in use" };
    }

    await prisma.branch.create({
      data: {
        personalInfo: {
          create: personalInfo,
        },
        branchInfo: {
          create: branchInfo,
        },

        moreInfo: {
          create: moreInfo,
        },
        ppSizePhoto: {
          create: {
            secure_url: passportImg.secure_url!,
            public_id: passportImg.public_id!,
          },
        },
        nationalIDCard: {
          create: {
            secure_url: nidImage.secure_url!,
            public_id: nidImage.public_id!,
          },
        },
        signature: {
          create: {
            secure_url: signatureImg.secure_url!,
            public_id: signatureImg.public_id!,
          },
        },
        tradeLicense: {
          create: {
            secure_url: licenceImg.secure_url!,
            public_id: licenceImg.public_id!,
          },
        },
      },
    });
    return { message: "success" };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "email already exists" };
    }

    return { error: "internal server error" };
  }
};

// .......................................for admin ..................................

// get all branch
export const getAllBranches = async () => {
  try {
    const branches = await prisma.branch.findMany({
      include: {
        personalInfo: true,
        branchInfo: true,
        ppSizePhoto: true,
        moreInfo: true,
      },
    });
    return { branches };
  } catch (error) {
    return { error: "internal server error" };
  }
};

// get single branch
export const GetSingleBranchAction = async (id: string) => {
  try {
    const branch = await prisma.branch.findUnique({
      where: { id },
      include: {
        personalInfo: true,
        branchInfo: true,
        ppSizePhoto: true,
        nationalIDCard: true,
        signature: true,
        tradeLicense: true,
        moreInfo: true,
      },
    });
    if (!branch) {
      return { error: "no branch found" };
    }
    return { branch };
  } catch (error) {
    return { error: "internal server error" };
  }
};

// update varifing
export const updateVarifyAction = async (id: string) => {
  try {
    let branch = await prisma.branch.findUnique({ where: { id } });
    if (!branch) {
      return { error: "branch not found" };
    }
    await prisma.branch.update({
      where: { id },
      data: {
        isVarified: true,
      },
    });
    return { message: "branch updated successfully" };
  } catch (error) {
    return { error: "internal server error" };
  }
};

// disable button
export const disabledAction = async (id: string) => {
  try {
    let branch = await prisma.branch.findUnique({ where: { id } });
    if (!branch) {
      return { error: "branch not found" };
    }
    let decode = jwtDecode(cookies().get("branch_token")?.value!);
    if (branch.id === decode.id) {
      return { error: "you can't block himself" };
    }
    await prisma.branch.update({
      where: { id },
      data: {
        disabled: branch.disabled ? false : true,
      },
    });
    return { message: "permission updated" };
  } catch (error) {
    return { error: "internal server error" };
  }
};

// create branchpass
export const createBranchPassAction = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  try {
    let branch = await prisma.branch.findUnique({
      where: { id },
      include: { branchInfo: { select: { branchEmail: true } } },
    });
    if (!branch) {
      return { error: "branch not found" };
    }
    if (password.length < 6) {
      return { error: "password must be at least 6 char" };
    }
    let encryptPass = hashedPassword(password);
    await prisma.branch.update({
      where: { id },
      data: {
        password: encryptPass,
      },
    });
    if (branch.role === "USER") {
      await sendCredentialMail(branch.branchInfo?.branchEmail!, password);
    }
    return { message: "new branch password created" };
  } catch (error) {
    return { error: "internal server error" };
  }
};

// get single branch
