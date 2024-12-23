"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const RevenueChart = () => {
  const { data, isPending } = useQuery({
    queryKey: ["admin_revenue"],
    queryFn: async () => await admin_revenue_growth(),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 rounded bg-white max-w-2xl shadow-md overflow-x-scroll scrollbar_hidden">
      <LineChart
        height={300}
        width={576}
        data={data?.Arr!.reverse()}
        className="w-full"
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default RevenueChart;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  admin_branch_grouth,
  admin_revenue_growth,
} from "@/actions/adminAnalytics";
