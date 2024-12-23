"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { payment_methods, payment_months, payment_years } from "../_data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSalary } from "@/actions/employee/employee";
import { customToast } from "@/components/shared/ToastContainer";

const AddSalaryModal = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [formData, setFormData] = useState({
    month: "",
    year: "",
    amount: "",
    method: "",
  });
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const queryclient = useQueryClient();

  // add salary to database
  const { isPending, mutate } = useMutation({
    mutationFn: addSalary,
    onSuccess: async ({ message }) => {
      if (message) {
        customToast("success", message);
        await queryclient.invalidateQueries({
          queryKey: ["employee-with-salary-info"],
        });
        closeBtnRef.current?.click();
      }
    },
  });

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.month ||
      !formData.amount ||
      !formData.year ||
      !formData.method
    ) {
      return customToast("error", "please fill all the fields");
    }

    let monthIndex = payment_months.indexOf(formData.month);
    mutate({
      id,
      monthIndex,
      amount: Number(formData.amount),
      year: Number(formData.year),
      month: formData.month,
      method: formData.method,
    });
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger ref={closeBtnRef}>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>

          <div className="flex justify-center items-center bg-gray-50">
            <Card className="w-full max-w-lg shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-start text-gray-800 bg-clip-text text-xl  md:text-2xl font-semibold ">
                  Add Employee Salary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Select Month */}
                  <div className="space-y-2">
                    <Label htmlFor="month">Select Month</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, month: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {payment_months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Select Year */}
                  <div className="space-y-2">
                    <Label htmlFor="year">Select Year</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, year: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {payment_years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter salary amount"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label htmlFor="method">Payment Method</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, method: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        {payment_methods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Submit Salary
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSalaryModal;
