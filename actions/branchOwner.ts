"use server";

import { hashedPassword, jwtDecode } from "@/data/auth";
import { getLast30Days } from "@/data/lineChartInfo";
import { prisma } from "@/lib/db";
import { LineChartArrType } from "@/types";
import { cookies } from "next/headers";

export const GetBranchWithoutIdAction = async () => {
  try {
    let token = cookies().get("branch_token")?.value;
    if (!token) {
      return { message: "token does'nt exist" };
    }
    let { id } = jwtDecode(token);
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
export const ChangeBranchPasswordForOwner = async (password: string) => {
  try {
    let token = cookies().get("branch_token")?.value;
    if (!token) {
      return { message: "token does'nt exist" };
    }
    let { id } = jwtDecode(token);

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
    return { message: "new branch password created" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const getAllStudentsOfBranch = async () => {
  try {
    let token = cookies().get("branch_token")?.value;
    if (!token) {
      return { message: "token does'nt exist" };
    }
    let { id } = jwtDecode(token);
    let BranchInfo = await prisma.branch.findUnique({
      where: { id },
      select: { role: true, branchInfo: { select: { branchName: true } } },
    });

    let isAdmin = BranchInfo!.role === "ADMIN" ? true : false;

    let allStudents = await prisma.student.findMany({
      where: { branchId: id },
      include: { profileDoc: true, paymentHistory: true },
    });
    let feesData = await prisma.courseFees.findMany({
      select: {
        name: true,
        oneYear: true,
        fourYears: true,
        sixMonths: true,
        threeMonths: true,
        threeYears: true,
        twoYears: true,
      },
    });

    return {
      allStudents,
      feesData,
      isAdmin,
      branchName: BranchInfo?.branchInfo?.branchName,
    };
  } catch (error) {
    return { error: "internal server error" };
  }
};

export const getDashboardInfoForBranch = async () => {
  try {
    let token = cookies().get("branch_token")?.value;
    if (!token) {
      return { message: "token does'nt exist" };
    }
    let { id } = jwtDecode(token);

    let allStudents = await prisma.student.findMany({
      where: { branchId: id },
      select: { isPaid: true, name: true, gender: true, createdAt: true },
    });
    let totalStudent = allStudents.length;
    let paidStudent = allStudents.filter((item) => item.isPaid === true).length;
    let unpaidStudent = totalStudent - paidStudent;
    let lastFiveStudent = allStudents.reverse().slice(0, 5);
    let maleCount = allStudents.filter((item) => item.gender === "male").length;
    let FemaleCount = totalStudent - maleCount;

    let notices = await prisma.notice.findMany();
    let lastNotice = notices[notices.length - 1];

    let transitions = await prisma.payment.findMany({
      where: { branchId: id },
    });
    let lastFiveTrans = transitions.reverse().slice(0, 5);

    // for chart
    let lastMonths = getLast30Days();

    allStudents.forEach((item) => {
      lastMonths.forEach((info, i) => {
        if (
          item.createdAt.toString().slice(0, 14) ===
          info.day.toString().slice(0, 14)
        ) {
          if (item.gender === "male") lastMonths[i].male += 1;
          if (item.gender === "female") lastMonths[i].female += 1;
        }
      });
    });
    // get earning earning form students

    const earnings = await prisma.paymentHistory.findMany({
      where: { branchId: id },
    });
    let earnedAmount: number = 0;
    earnings.forEach((item) => {
      earnedAmount = earnedAmount + item.amount;
    });

    // return the values
    return {
      totalStudent,
      paidStudent,
      unpaidStudent,
      lastNotice,
      lastFiveTrans,
      lastFiveStudent,
      maleCount,
      FemaleCount,
      lastMonths,
      earnedAmount,
    };
  } catch (error) {
    return { error: "internal server error" };
  }
};
///
