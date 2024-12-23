"use client";
import { FailedPayment } from "@/actions/amerpay";
import { customToast } from "@/components/shared/ToastContainer";
import { useQuery } from "@tanstack/react-query";

import { useParams, useRouter } from "next/navigation";

const PaymentFailPage = () => {
  const router = useRouter();
  let { id } = useParams() as { id: string };
  const { isPending } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      let data = await FailedPayment(id);
      if (data.error) return customToast("error", data.error);
      if (data.message) {
        customToast("error", data.message);
        router.push("/branch/unpaid-students");
      }
    },
  });
  return (
    <div className=" flex items-center justify-center flex-col w-full h-screen bg-white fixed top-0 left-0 z-50">
      {isPending ? (
        <div>Processing...</div>
      ) : (
        <div className="p-3 rounded-sm bg-red-500 shadow-xl">
          Payment Failed
        </div>
      )}
    </div>
  );
};

export default PaymentFailPage;
