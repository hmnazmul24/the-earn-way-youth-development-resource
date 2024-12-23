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
  const status = params.get("status") as "success" | "fail";

  return (
    <div className="flex items-center justify-center flex-col w-full h-screen bg-white fixed top-0 left-0 z-50">
      <>
        {status === "success" && (
          <LottieComp lottie={succeessAnime} height={400} />
        )}
        {status === "success" ? (
          <div className="p-3 rounded-sm bg-green-500 shadow-xl">
            Payment Successful
          </div>
        ) : (
          <div className="p-3 rounded-sm bg-red-500 shadow-xl">
            Payment failed
          </div>
        )}
        <div>
          <Link href={"/branch/dashboard/analytics"}>
            <div className="py-5 text-blue-500">
              {status === "success" ? "go to dashboard" : "Back to payment"}
            </div>
          </Link>
        </div>
      </>
    </div>
  );
};

export default PaymentSuccessPage;
