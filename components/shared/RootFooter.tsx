import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialIcons from "./SocialIcons";

const RootFooter = () => {
  return (
    <div className=" bg-black ">
      <div className="md:container px-2 flex items-center justify-between">
        <Link href={"/"}>
          <div className="p-4 -translate-y-6 z-40 relative bg-yellow-500 flex items-center justify-center">
            <Image
              src={"/logo.png"}
              className="drop-shadow-md md:w-24 w-12"
              height={100}
              width={100}
              alt="main_logo"
            />
          </div>
        </Link>
        <div className="flex items-center justify-center text-sm text-gray-200 gap-2">
          @copyright2024, all rights reserved.
        </div>
        <div className="hidden md:block">
          <SocialIcons footer={true} />
        </div>
      </div>
    </div>
  );
};

export default RootFooter;
