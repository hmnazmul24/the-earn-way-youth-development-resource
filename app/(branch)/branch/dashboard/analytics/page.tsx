"use client";

import React, { Fragment } from "react";
import BranchInfoDashboard from "@/components/branch/dashboard/BranchInfo";
import BranchStatistics from "@/components/branch/dashboard/BranchStatistics";
import LastNotice from "@/components/branch/dashboard/lastNotice";
import LastTransections from "@/components/branch/dashboard/LastTransections";
import LastPaidInfo from "@/components/branch/dashboard/lastPaidInfo";

import LineCharts from "@/app/(branch)/_charts/LineChart";
import { useQuery } from "@tanstack/react-query";
import { getDashboardInfoForBranch } from "@/actions/branchOwner";
import { BranchMaleFemaleType, TransInfoType } from "@/types/payment";
import { TotalEarnings } from "@/app/(branch)/_charts/TotalEarnings";

const Analytics = () => {
  const { data, isPending } = useQuery({
    queryKey: ["notice"],
    queryFn: async () => await getDashboardInfoForBranch(),
  });

  if (isPending) {
    return <div>loading...</div>;
  }

  if (data?.error) {
    return <div className="text-red-500">Some error occurs</div>;
  }

  let {
    lastNotice,
    paidStudent,
    totalStudent,
    unpaidStudent,
    lastFiveTrans,
    lastFiveStudent,
    FemaleCount,
    maleCount,
    lastMonths,
  } = data!;
  let lastFive: TransInfoType[] | undefined = lastFiveTrans?.map((item) => ({
    name: item.name,
    amount: item.amount,
    trade: item.courseTrade,
  }));

  let maleData: BranchMaleFemaleType = {
    count: maleCount!,
    gender: "Male",
    total: totalStudent!,
    text: "Source : The number of male students is derived from the total count of all registered students.",
  };
  let femaleDate: BranchMaleFemaleType = {
    count: FemaleCount!,
    gender: "Femele ",
    total: totalStudent!,
    text: " Source :The number of Female students is derived from the total count of all registered students.",
  };

  return (
    <Fragment>
      {data && (
        <div className="bg-white rounded-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
            <BranchInfoDashboard
              all={totalStudent!}
              paid={paidStudent!}
              unpaid={unpaidStudent!}
            />
            {lastMonths && <LineCharts data={lastMonths!} />}
            <TotalEarnings amount={data.earnedAmount!} />
            {lastNotice && (
              <LastNotice
                date={lastNotice!.createdAt!}
                notice={lastNotice!.text!}
              />
            )}
            <BranchStatistics female={femaleDate} male={maleData} />
            {lastFive && <LastTransections data={lastFive!} />}
            {lastFiveStudent && <LastPaidInfo data={lastFiveStudent!} />}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Analytics;
