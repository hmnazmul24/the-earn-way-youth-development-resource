"use server";
import { generateUniqueTransId } from "@/data/helper";
import { prisma } from "@/lib/db";
import axios from "axios";

type PaymentType = {
  id: string;
  amount: string;
  phone: string;
  name: string;
};

export async function processAmerpayPayment({
  id,
  amount,
  name,
  phone,
}: PaymentType) {
  let trans_id = generateUniqueTransId();
  let uniqueId = Math.round(Math.random() * 354254).toString();
  const payload = {
    store_id: process.env.AMERPAY_STORE_ID,
    tran_id: uniqueId,
    success_url: `${process.env.BASE_URL}/api/payment?amount=${amount}&transId=${trans_id}`,
    fail_url: `${process.env.BASE_URL}/api/payment/fail?transId=${trans_id}`,
    cancel_url: `${process.env.BASE_URL}/branch/payment/cancel/${trans_id}`,

    amount: amount,
    currency: "BDT",
    signature_key: process.env.AMERPAY_SIGNATURE,
    desc: "Digital Youth It development Resource",
    cus_name: name,
    cus_email: "email@gmail.com",
    cus_phone: phone,
    type: "json",
  };

  try {
    let { data } = (await axios.post(
      "https://​sandbox​.aamarpay.com/jsonpost.php",
      payload
    )) as { data: { result: string; payment_url: string } };

    await prisma.student.update({
      where: { id },
      data: {
        transId: trans_id,
      },
    });
    return { data };
  } catch (error) {
    return { error: "error" };
  }
}

export const AcceptPayment = async ({
  amount,
  transId,
}: {
  transId: string | null;
  amount: string | null;
}) => {
  try {
    if (transId === null || amount === null) {
      return { success: false };
    }
    let student = await prisma.student.findFirst({ where: { transId } });

    if (student) {
      await prisma.payment.create({
        data: {
          amount: amount,
          courseDuration: student?.courseDuration,
          courseTrade: student?.courseTrade,
          name: student?.name,
          roll: student.genRoll!,
          phoneNo: student.mobile,
          branchId: student.branchId,
        },
      });
      await prisma.student.update({
        where: { id: student.id },
        data: {
          isPaid: true,
        },
      });
      return { success: true };
    } else {
      return { error: "some error occurs" };
    }
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const CancelPayment = async (trans_id: string) => {
  try {
    let student = await prisma.student.findFirst({
      where: { transId: trans_id },
    });
    await prisma.student.update({
      where: { id: student?.id },
      data: {
        transId: null,
      },
    });
    return { success: true };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const FailedPayment = async (trans_id: string) => {
  try {
    let student = await prisma.student.findFirst({
      where: { transId: trans_id },
    });
    await prisma.student.update({
      where: { id: student?.id },
      data: {
        transId: null,
      },
    });
    return { message: "payment has been failed !" };
  } catch (error) {
    return { error: "internal server error" };
  }
};

// for branch
type BranchType = {
  id: string;
  amount: string;
  phone: string;
  email: string;
  name: string;
};
// branch payment
export async function processAmerpayPaymentForBranch({
  id,
  amount,
  name,
  email,
  phone,
}: BranchType) {
  let trans_id = generateUniqueTransId();
  let uniqueId = Math.round(Math.random() * 354254).toString();
  const payload = {
    store_id: process.env.AMERPAY_STORE_ID,
    tran_id: uniqueId,
    success_url: `${process.env.BASE_URL}/api/payment/branch?amount=${amount}&transId=${trans_id}`,
    fail_url: `${process.env.BASE_URL}/api/payment/branch/fail?transId=${trans_id}`,
    cancel_url: `${process.env.BASE_URL}/branch/dashboard/analytics`,

    amount: amount,
    currency: "BDT",
    signature_key: process.env.AMERPAY_SIGNATURE,
    desc: "Digital Youth It development Resource",
    cus_name: name,
    cus_email: email,
    cus_phone: phone,
    type: "json",
  };

  try {
    let { data } = (await axios.post(
      "https://​sandbox​.aamarpay.com/jsonpost.php",
      payload
    )) as { data: { result: string; payment_url: string } };

    await prisma.branch.update({
      where: { id },
      data: {
        transId: trans_id,
      },
    });
    return { data };
  } catch (error) {
    return { error: "error" };
  }
}
