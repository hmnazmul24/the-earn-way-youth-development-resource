"use client";

import { getAllStudentsOfBranch } from "@/actions/branchOwner";

import { customToast } from "@/components/shared/ToastContainer";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const PaidStudentTable = dynamic(
  () => import("@/components/branch/students/StudentTable"),
  {
    ssr: false,
  }
);
import React from "react";

const AllStudents = () => {
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
      {/* <StudentFilteredBox /> */}
      {data?.allStudents && (
        <PaidStudentTable
          info={data?.allStudents}
          branchName={data.branchName!}
        />
      )}
    </div>
  );
};

export default AllStudents;
