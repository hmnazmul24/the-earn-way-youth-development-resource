"use client";

import { AcceptPayment } from "@/actions/amerpay";
import LottieComp from "@/components/shared/LottieComp";
import { customToast } from "@/components/shared/ToastContainer";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import succeessAnime from "@/public/lottie/success.json";
import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

const PaymentSuccessContent = () => {
  const router = useRouter();
  const params = useSearchParams();
  const amount = params.get("amount");
  const trans_id = params.get("transId");

  let { isPending } = useQuery({
    queryKey: [],
    queryFn: async () => {
      let data = await AcceptPayment({
        transId: trans_id,
        amount,
      });
      router.push("/branch/payment/success");
      if (data.error) return customToast("error", data.error);
      return data;
    },
  });

  return (
    <div className="flex items-center justify-center flex-col w-full h-screen bg-white fixed top-0 left-0 z-50">
      {isPending ? (
        <div>Processing...</div>
      ) : (
        <>
          <LottieComp lottie={succeessAnime} height={400} />
          <div className="p-3 rounded-sm bg-green-500 shadow-xl">
            Payment Successful
          </div>
          <div>
            <Link href={"/branch/dashboard/analytics"}>
              <div className="py-5 text-blue-500">Go to dashboard</div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
