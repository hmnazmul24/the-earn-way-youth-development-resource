"use server";

import { jwtDecode } from "@/data/auth";
import { sendPaymentNotificationEmail } from "@/data/student_mails";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export const addPaymentOfStudent = async ({
  studentId,
  amount,
}: {
  studentId: string;
  amount: number;
}) => {
  try {
    let employeeName: string | undefined;
    let employeePosition: string | undefined;

    let token = cookies().get("branch_token")?.value!;
    let { id, employeeId } = jwtDecode(token);

    if (employeeId) {
      let data = await prisma.employee.findUnique({
        where: { id: employeeId },
      });
      (employeeName = data?.fullName), (employeePosition = data?.position);
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      return { error: "student not found" };
    }
    if (student.email) {
      await sendPaymentNotificationEmail(
        student.name,
        student.email,
        student.courseTrade,
        amount
      );
    }

    // create payment
    await prisma.paymentHistory.create({
      data: {
        studentId,
        amount,
        employeeId,
        employeeName,
        employeePosition,
        branchId: id,
      },
    });
    return { message: `${amount} taka is added` };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const deletPaymentHistory = async ({
  paymentHistoryId,
}: {
  paymentHistoryId: string;
}) => {
  try {
    await prisma.paymentHistory.delete({ where: { id: paymentHistoryId } });
    return { message: `record deleted` };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const getPaymentHistoriesOfBranchStudent = async () => {
  try {
    let token = cookies().get("branch_token")?.value!;
    let { id } = jwtDecode(token);
    const history = await prisma.paymentHistory.findMany({
      where: { branchId: id },
    });

    return { history };
  } catch (error) {
    return { error: "internal server error" };
  }
};
