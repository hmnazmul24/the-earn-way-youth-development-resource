"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EditResultType } from "@/types";
import { customToast } from "@/components/shared/ToastContainer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { admin_PublishResult } from "@/actions/studentsForAdmin/giveResult";

let result_data = ["F", "D", "C", "B", "A-", "A", "A+"];

const PublishResult = ({
  children,
  studentData,
}: {
  children: React.ReactNode;
  studentData: EditResultType[] | null;
}) => {
  const queryClient = useQueryClient();
  const [studentInfo, setStudentinfo] = useState<EditResultType[] | null>(null);

  // muate
  const { isPending, mutate } = useMutation({
    mutationFn: admin_PublishResult,
    onSuccess: ({ error, message }) => {
      if (error) return customToast("error", error);
      if (message) customToast("success", message);
      queryClient.invalidateQueries({
        queryKey: ["filteredStudentOfBranchForAdmin"],
      });
    },
  });

  const hanldeChange = (id: string, result: string) => {
    const updatedInfo = studentInfo?.map((student) =>
      student.id === id
        ? { ...student, result: result ? result : null }
        : student
    );
    if (updatedInfo) {
      setStudentinfo(updatedInfo);
    }
  };

  const hanldePublish = () => {
    if (
      studentInfo === null ||
      studentInfo?.filter((item) => item.result === null).length! > 0
    ) {
      return customToast("error", "Please Provide all the results");
    }

    mutate(studentInfo!);
  };

  useEffect(() => {
    setStudentinfo(studentData);
  }, [studentData]);

  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="max-w-3xl h-5/6">
          <DialogHeader>
            <DialogTitle>Give all the results of students</DialogTitle>
            <DialogDescription>
              <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-4 row-auto gap-2">
                {studentInfo?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-2 justify-center gap-2 bg-amber-100 border shadow-sm rounded"
                  >
                    <span>{item.roll}</span>
                    <Select
                      value={item.result ?? ""}
                      onValueChange={(value) => hanldeChange(item.id, value)}
                    >
                      <SelectTrigger className="w-[85px]">
                        <SelectValue placeholder="result" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {result_data.map((result) => (
                          <SelectItem key={result} value={result}>
                            {result}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end">
                <Button
                  disabled={isPending}
                  onClick={hanldePublish}
                  className="bg-blue-500 rounded-[50px] hover:bg-blue-600 p-7 py-5"
                >
                  Publish
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublishResult;
