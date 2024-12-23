"use client";

import { processAmerpayPaymentForBranch } from "@/actions/amerpay";
import { customToast } from "@/components/shared/ToastContainer";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

const OneTimePaymentAmount = ({
  amount,
  email,
  id,
  name,
  phone,
}: {
  amount: string;
  email: string;
  id: string;
  name: string;
  phone: string;
}) => {
  const { mutate, isPending: updatePending } = useMutation({
    mutationFn: processAmerpayPaymentForBranch,
    onSuccess: ({ error, data }) => {
      if (error) return customToast("error", error);
      if (data?.payment_url) {
        window.open(data.payment_url, "_self");
      }
    },
  });
  return (
    <div className="bg-slate-50 fixed top-0 left-0 w-full min-h-screen z-50 flex items-center justify-center">
      <div className="max-w-md text-center p-4 py-6 rounded-md shadow-lg bg-white">
        <Image
          height={60}
          width={60}
          alt="main-logo"
          className=" drop-shadow-lg m-auto"
          src={"/logo.png"}
        />
        <div>
          To get access the branch Dashboard you have to pay{" "}
          <span className="text-green-600 mx-3 text-3xl font-salsa">
            {amount}
          </span>
          taka ,<span className="text-purple-500">One time payment</span>,
          <span className="text-sky-500">lifetime access</span>
          <div className="my-3">
            <Button
              onClick={() => {
                mutate({ amount, email, id, name, phone });
              }}
              className="rounded-sm p-6  font-sans bg-green-600  text-lg"
            >
              pay {amount} taka now <FaAngleDoubleRight className="ml-3" />
            </Button>
          </div>
          <div className="bg-slate-200 py-3 rounded-md my-3">
            <p>if there any problem , contact us</p>
            mobile no:{" "}
            <span className="px-3 text-2xl text-green-500">01880110842</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneTimePaymentAmount;
