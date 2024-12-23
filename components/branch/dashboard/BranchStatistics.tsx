import BranchEarning from "@/app/(branch)/_charts/Earning";
import { BranchMaleFemaleType } from "@/types/payment";

import React from "react";

const BranchStatistics = ({
  male,
  female,
}: {
  male: BranchMaleFemaleType;
  female: BranchMaleFemaleType;
}) => {
  return (
    <div className="flex flex-col md:flex-row  items-center  md:justify-between gap-2">
      <div className="md:w-1/2 rounded">
        <BranchEarning data={male} />
      </div>
      <div className=" md:w-1/2 rounded">
        <BranchEarning data={female} />
      </div>
    </div>
  );
};

export default BranchStatistics;
