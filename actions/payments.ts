"use server";

import { jwtDecode } from "@/data/auth";
import { generateUniqueTransId } from "@/data/helper";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export const getAllPaymentHistory = async () => {
  try {
    let token = cookies().get("branch_token")?.value;
    if (!token) {
      return { message: "token does'nt exist" };
    }
    let { id } = jwtDecode(token);
    let paymentsHistory = await prisma.payment.findMany({
      where: { branchId: id },
    });
    return { paymentsHistory };
  } catch (error) {
    return { error: "internal server error" };
  }
};

export const AdminStudentPayment = async (id: string) => {
  let transId = generateUniqueTransId();

  try {
    let student = await prisma.student.update({
      where: { id },
      data: { transId, isPaid: true },
    });

    if (student) {
      await prisma.payment.create({
        data: {
          amount: "0",
          courseDuration: student?.courseDuration,
          courseTrade: student?.courseTrade,
          name: student?.name,
          roll: student.genRoll!,
          phoneNo: student.mobile,
          branchId: student.branchId,
        },
      });

      return { success: true };
    }
  } catch (error) {
    return { error: "internal server error" };
  }
};
