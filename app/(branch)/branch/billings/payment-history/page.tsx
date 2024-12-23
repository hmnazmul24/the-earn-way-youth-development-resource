"use client";
import { getAllPaymentHistory } from "@/actions/payments";
import PaymentHistoryTable from "@/components/branch/billings/HistoryTable";
import { customToast } from "@/components/shared/ToastContainer";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const PaymentHistory = () => {
  let { data, isPending, isError } = useQuery({
    queryKey: ["allPaymentHistory"],
    queryFn: async () => {
      let data = await getAllPaymentHistory();
      if (data.error) return customToast("error", data.error);
      return data;
    },
  });
  if (isPending) {
    return <div>Processing...</div>;
  }
  if (isError) {
    return <div className="text-red-500">some error occurs</div>;
  }
  return (
    <div>
      <PaymentHistoryTable info={data?.paymentsHistory!} />
    </div>
  );
};

export default PaymentHistory;
