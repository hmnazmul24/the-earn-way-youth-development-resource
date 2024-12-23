"use server";

import { prisma } from "@/lib/db";

export const getSingleStudentResult = async ({
  reg,
  roll,
}: {
  reg: string;
  roll: string;
}) => {
  try {
    const result = await prisma.student.findFirst({
      where: {
        genReg: reg,
        genRoll: roll,
        isPaid: true,
      },
      include: {
        branch: { select: { branchInfo: { select: { branchName: true } } } },
        profileDoc: { select: { secure_url: true } },
      },
    });
    return { result };
  } catch (error) {
    return { error: "internal server error" };
  }
};
