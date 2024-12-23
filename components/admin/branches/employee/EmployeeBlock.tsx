import Image from "next/image";
import React from "react";

const EmployeeDeleted = () => {
  return (
    <div className="bg-slate-50 fixed top-0 left-0 w-full min-h-screen z-50 flex items-center justify-center">
      <div className="max-w-md text-center p-4 py-6 rounded-md shadow-lg bg-white">
        <Image
          height={60}
          width={60}
          alt="main-logo"
          className=" drop-shadow-lg m-auto"
          src={"/logo.png"}
        />
        <p className="text-red-500">
          Your account has beeen Removed, you can not access the dashboard
        </p>
      </div>
    </div>
  );
};

export default EmployeeDeleted;
