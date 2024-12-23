"use client";

import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BranchStudentType } from "@/types/students";
import { Trash, PlusCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPaymentOfStudent,
  deletPaymentHistory,
} from "@/actions/studentPaymentHistory";
import Image from "next/image";
import { StudentPaymentHistoryType } from "@/types/payment";

const StudentPaymentRecords = ({
  children,
  student,
  imgUrl,
}: {
  children: React.ReactNode;
  student: BranchStudentType;
  imgUrl: string;
}) => {
  const queryClient = useQueryClient();
  const [newPayment, setNewPayment] = useState<string>("");

  // add payments
  const { mutate, isPending: create_pending } = useMutation({
    mutationFn: addPaymentOfStudent,
    onSuccess: async ({ message, error }) => {
      console.log(error);

      if (message) {
        setNewPayment("");
        await queryClient.invalidateQueries({
          queryKey: ["allStudentsOfBranch"],
        });
      }
    },
  });

  // delete payments
  const { mutate: deleteMutate, isPending: delete_pending } = useMutation({
    mutationFn: deletPaymentHistory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["allStudentsOfBranch"],
      });
    },
  });

  // Handle adding a new payment
  const addPayment = () => {
    if (newPayment.trim() === "") return;
    mutate({
      amount: Number(newPayment),
      studentId: student.id,
    });
  };

  // Handle deleting a payment
  const deletePayment = (paymentId: string) => {
    if (paymentId) {
      deleteMutate({ paymentHistoryId: paymentId });
    }
  };
  let isPending = false;

  console.log(student.id);

  return (
    <div>
      <Dialog onOpenChange={() => setNewPayment("")}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Records</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-4 mt-4">
            <Image
              src={imgUrl || "/default-avatar.png"}
              alt={student.name}
              height={50}
              width={50}
              className="w-12 h-12 rounded-full object-cover border"
            />
            <h2 className="text-lg font-bold">{student.name}</h2>
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Enter payment amount"
                value={newPayment}
                onChange={(e) => setNewPayment(e.target.value)}
                className="flex-1"
              />
              <Button
                disabled={create_pending}
                onClick={addPayment}
                className="flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Payment History</h3>
            {isPending ? (
              <div>loading..</div>
            ) : (
              <Fragment>
                {" "}
                <ul className="space-y-2">
                  {student.paymentHistory &&
                    student.paymentHistory.length !== 0 &&
                    student.paymentHistory?.map((payment) => (
                      <li
                        key={payment.id}
                        className="flex justify-between items-center border p-2 rounded-md shadow-sm"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            Amount: {payment.amount} taka
                          </p>
                          <p className="text-xs text-gray-500">
                            Date: {payment.createdAt.toLocaleString()}
                          </p>
                          {payment.employeeId && (
                            <p className="text-xs text-gray-500">
                              taken by :{" "}
                              <span className="font-semibold">
                                {payment.employeeName}{" "}
                              </span>
                              <span className="text-xs text-gray-400">
                                {payment.employeePosition}
                              </span>
                            </p>
                          )}
                        </div>
                        <button
                          disabled={delete_pending}
                          onClick={() => deletePayment(payment.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                </ul>
                {student.paymentHistory &&
                  student.paymentHistory.length === 0 && (
                    <p className="text-sm text-gray-500 mt-4">
                      No payments recorded.
                    </p>
                  )}
              </Fragment>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentPaymentRecords;
