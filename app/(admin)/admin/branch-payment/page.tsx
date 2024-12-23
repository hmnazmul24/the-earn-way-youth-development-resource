"use client";

import { oneTimePaymentUpdate, oneTimePrice } from "@/actions/Admin";
import { customToast } from "@/components/shared/ToastContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const BranchPayment = () => {
  const [price, setPrice] = useState<string>("0");

  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["onetimePay"],
    queryFn: async () => {
      let data = await oneTimePrice();
      if (data.amount) {
        setPrice(data.amount);
      }
      return data;
    },
  });
  const { mutate, isPending: updatePending } = useMutation({
    mutationFn: oneTimePaymentUpdate,
    onSuccess: ({ error, message, amount }) => {
      if (error) return customToast("error", error);
      if (message) customToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["onetimePay"] });
      setPrice(amount!);
    },
  });

  return (
    <div className="">
      <h1 className="my-2">One time branch payment :)</h1>
      <div className="max-w-md bg-white rounded-md">
        <div className="w-full flex items-center justify-center h-44 text-3xl ">
          <p>
            {" "}
            <span className="text-green-700 font-salsa text-[4rem]">
              {data?.amount}
            </span>
            taka
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ amount: price });
          }}
          className="flex items-center justify-between"
        >
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="w-full"
          />
          <Button type="submit">Change</Button>
        </form>
      </div>
    </div>
  );
};

export default BranchPayment;
