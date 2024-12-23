"use client";
import { getAllStudentsOfBranch } from "@/actions/branchOwner";

import { customToast } from "@/components/shared/ToastContainer";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import React from "react";

const UnPaidStudentTable = dynamic(
  () => import("@/components/branch/students/UnpaidStudent"),
  {
    ssr: false,
  }
);
const UnpaidStudents = () => {
  let { data, isPending, isError } = useQuery({
    queryKey: ["allStudentsOfBranch"],
    queryFn: async () => {
      let data = await getAllStudentsOfBranch();
      if (data.error) return customToast("error", data.error);
      return data;
    },
  });
  if (isPending) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div className="text-red-500">error occurs</div>;
  }

  return (
    <div>
      {data?.allStudents && (
        <UnPaidStudentTable
          info={data?.allStudents}
          feesData={data.feesData!}
          isAdminStudent={data.isAdmin}
        />
      )}
    </div>
  );
};

export default UnpaidStudents;
