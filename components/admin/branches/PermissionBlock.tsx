import Image from "next/image";
import React from "react";

const PermissionBlock = () => {
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
        <p>
          Your account has beeen <span className="text-red-500">blocked</span>{" "}
          by the authority , to get your account again please contact us through
          mobile no:{" "}
          <span className="px-3 text-2xl text-green-500">01880110842</span>
        </p>
      </div>
    </div>
  );
};

export default PermissionBlock;
