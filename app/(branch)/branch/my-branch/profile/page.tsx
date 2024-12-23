"use client";

import { GetSingleBranchAction } from "@/actions/branch";
import { GetBranchWithoutIdAction } from "@/actions/branchOwner";
import BranchInfo from "@/components/branch/profile/MyBranchInfo";
import useBranchStore from "@/hooks/useBranchStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
let getSingleBranchInfo = async () => {
  let data = await GetBranchWithoutIdAction();
  return data;
};

const BranchProfile = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["branchOwner"],
    queryFn: getSingleBranchInfo,
  });
  if (isPending) {
    return <div>loading....</div>;
  }
  if (isError) {
    return <div className="text-red-500">Error occurs</div>;
  }

  return (
    <div>
      <BranchInfo info={data.branch!} />
    </div>
  );
};

export default BranchProfile;
