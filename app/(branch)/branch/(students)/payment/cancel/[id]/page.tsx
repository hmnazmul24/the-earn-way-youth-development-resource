"use client";
import { CancelPayment } from "@/actions/amerpay";
import { customToast } from "@/components/shared/ToastContainer";
import { useQuery } from "@tanstack/react-query";

import { useParams, useRouter } from "next/navigation";

const PaymentCancel = () => {
  let { id } = useParams() as { id: string };
  const router = useRouter();
  const { isPending } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      let data = await CancelPayment(id);
      if (data.error) return customToast("error", data.error);
      if (data.success) {
        router.push("/branch/unpaid-students");
      }
    },
  });
  return (
    <div className=" flex items-center justify-center flex-col w-full h-screen bg-white fixed top-0 left-0 z-50">
      <div>{isPending && "Processing..."}</div>
    </div>
  );
};

export default PaymentCancel;
