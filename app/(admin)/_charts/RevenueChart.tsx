import Link from "next/link";
import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

type RevenueType = {
  revenue: number;
};

const RevenueChart = ({ revenue }: RevenueType) => {
  let data = [{ text: "Total One time Payment" }];
  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 pb-6 mb-2">
        <span className="text-sm mb-3">total revenue from Students</span>
        <h1 className="text-[2.5rem] font-serif text-green-600">
          {" "}
          {revenue} <span className="text-sm font-incons">taka</span>
        </h1>
        <div className="text-blue-500 flex items-center justify-between my-3 text-lg">
          <span>------------------------</span>
          <Link href={"/admin/revenue"}>
            <FaAngleDoubleRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
