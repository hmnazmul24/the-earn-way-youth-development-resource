"use client";

import React from "react";
import AnimatedBtn from "./AnimatedBtn";

const ApplyBranch = () => {
  return (
    <div className="py-14 bg-slate-100 flex items-center flex-col justify-center">
      <h1 className="text-xl md:text-3xl text-amber-500 my-5 underline">
        Apply For a Branch
      </h1>
      <div className="mb-5">
        <AnimatedBtn />
      </div>
    </div>
  );
};

export default ApplyBranch;
