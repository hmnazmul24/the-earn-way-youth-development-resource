"use client";

import React from "react";
import Lottie from "react-lottie";
import animationDate from "@/public/lottie/branchLoading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationDate,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const AdminLoading = () => {
  return (
    <div className="h-screen z-50 w-full fixed top-0 left-0 flex items-center justify-center bg-white">
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};

export default AdminLoading;
