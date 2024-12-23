"use server";

import { prisma } from "@/lib/db";

export async function generateRollAndRegistrationNumbers() {
  // Assuming this is the result you got from the database query

  const lastStudent = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
    take: 1,
  });
  if (lastStudent.length === 0) {
    return {
      nextRollNumber: "241501",
      nextRegistrationNumber: "1283350192",
      certificateSLNo: "28495",
    };
  } else {
    const newRoll = Number(lastStudent[0].genRoll!) + 1;
    const newReg = Number(lastStudent[0].genReg!) + 1;
    const newSLNo = Number(lastStudent[0].certificateSLNo! + 1);
    return {
      nextRollNumber: newRoll.toString(),
      nextRegistrationNumber: newReg.toString(),
      certificateSLNo: newSLNo.toString(),
    };
  }
}
