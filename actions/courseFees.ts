"use server";

import { prisma } from "@/lib/db";
import { CourseFeesType } from "@/types";

export const UpdateCourseFees = async (data: CourseFeesType) => {
  try {
    let isExist = await prisma.courseFees.findFirst({
      where: { name: data.name },
    });
    if (isExist) {
      await prisma.courseFees.update({
        where: { id: isExist.id },
        data: data,
      });
      return { message: "price updated successfully" };
    } else {
      await prisma.courseFees.create({
        data: data,
      });
      return { message: "price updated successfully" };
    }
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const getAllCourseFees = async () => {
  try {
    let feesData = await prisma.courseFees.findMany({
      select: {
        createdAt: true,
        fourYears: true,
        id: true,
        name: true,
        oneYear: true,
        sixMonths: true,
        threeMonths: true,
        threeYears: true,
        twoYears: true,
      },
    });

    return { feesData };
  } catch (error) {
    return { error: "internal server error" };
  }
};
