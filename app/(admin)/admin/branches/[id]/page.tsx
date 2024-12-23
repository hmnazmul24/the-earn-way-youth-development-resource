"use client";

import { GetSingleBranchAction } from "@/actions/branch";
import AdminBranchAction from "@/components/admin/branches/AdminBranchAction";
import DetailBranch from "@/components/admin/branches/DetailBranch";
import StudentsActions from "@/components/admin/branches/branchStudent/StudentsActions";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

let getSingleBranchInfo = async (id: string) => {
  let data = await GetSingleBranchAction(id);
  return data;
};

const DetailBranchInfo = ({ params }: { params: { id: string } }) => {
  const [showAction, setShowAction] = useState<"info" | "action" | "student">(
    "info"
  );

  const { data, isPending, isError } = useQuery({
    queryKey: ["branch"],
    queryFn: async () => await getSingleBranchInfo(params.id),
  });
  if (isPending) {
    return <div>loading....</div>;
  }
  if (isError) {
    return <div className="text-red-500">Error occurs</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold my-2 left-2 flex items-center justify-start gap-3">
        <span>Branch Information</span>
        <div className="flex items-center gap-2">
          <Button
            className={`${
              showAction === "info"
                ? "bg-black"
                : "bg-transparent shadow-none text-green-500"
            }`}
            onClick={() => setShowAction("info")}
          >
            Info
          </Button>
          <Button
            className={`${
              showAction === "action"
                ? "bg-black"
                : "bg-transparent shadow-none text-green-500"
            }`}
            onClick={() => setShowAction("action")}
          >
            Actions
          </Button>
          <Button
            className={`${
              showAction === "student"
                ? "bg-black"
                : "bg-transparent shadow-none text-green-500"
            }`}
            onClick={() => setShowAction("student")}
          >
            Students
          </Button>
        </div>
      </h1>
      {showAction === "action" ? (
        <AdminBranchAction
          varified={data.branch?.isVarified!}
          id={data.branch?.id!}
          checked={data.branch?.disabled!}
          branchAllowChecked={!data.branch?.haveToPay!}
          isPaid={data.branch?.isOneTimePaid!}
          isAdmin={data.branch?.role!}
        />
      ) : showAction === "info" ? (
        <DetailBranch branchInfo={data.branch!} />
      ) : (
        <StudentsActions id={params.id} />
      )}
    </div>
  );
};

export default DetailBranchInfo;
