"use server";

import { jwtDecode } from "@/data/auth";
import { prisma } from "@/lib/db";
import { CertificateInfoType, EditResultType } from "@/types";
import { format } from "date-fns";
import { cookies } from "next/headers";

export const admin_AllStudentsOfBranch = async ({ id }: { id: string }) => {
  try {
    let allStudents = await prisma.student.findMany({
      where: { branchId: id, isPaid: true },
      select: { courseDuration: true, courseTrade: true },
    });

    return { allStudents };
  } catch (error) {
    return { error: "internal server error" };
  }
};

export const admin_AllFilteredStudentsOfBranch = async ({
  id,
  trade,
  duration,
}: {
  id: string;
  trade: string;
  duration: string;
}) => {
  try {
    let filteredStudent = await prisma.student.findMany({
      where: {
        branchId: id,
        courseDuration: duration,
        courseTrade: trade,
        isPaid: true,
      },
    });

    return { filteredStudent };
  } catch (error) {
    return { error: "internal server error" };
  }
};

export const admin_PublishResult = async (data: EditResultType[]) => {
  try {
    data.forEach(async (item) => {
      await prisma.student.updateMany({
        where: { id: item.id },
        data: { genResult: item.result },
      });
    });
    return { message: "result is published" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const getCertificateInfo = async (studentId: string) => {
  try {
    let { id } = jwtDecode(cookies().get("branch_token")?.value!);
    let branch = await prisma.branch.findUnique({
      where: { id },
      select: { branchInfo: { select: { branchName: true, branchNo: true } } },
    });
    let studentInfo = await prisma.student.findUnique({
      where: { id: studentId },
    });
    let info: CertificateInfoType = {
      branchCode: branch?.branchInfo?.branchNo!.toString()!,
      branchName: branch?.branchInfo?.branchName!,
      courseName: studentInfo?.courseTrade!,
      fathersName: studentInfo?.fatherName!,
      mothersName: studentInfo?.motherName!,
      fullName: studentInfo?.name!,
      grade: studentInfo?.genResult!,
      held: studentInfo?.courseRange!,
      issueDate: format(new Date(), "PPP"),
      reg: studentInfo?.genReg!,
      roll: studentInfo?.genRoll!,
    };

    return { info };
  } catch (error) {
    return { error: "internal server error" };
  }
};
