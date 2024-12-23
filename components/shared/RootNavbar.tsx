"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import LoginDialog from "./LoginDialog";
import Image from "next/image";
import SocialIcons from "./SocialIcons";

import SheetContext from "./SheetContext";
import { isAuthenticated } from "@/actions/auth";
import { useRouter } from "next/navigation";

const RootNavbar = () => {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleClick = async () => {
    let auth = await isAuthenticated();
    if (buttonRef.current) {
      if (auth) {
        router.push("/branch/dashboard/analytics");
      } else {
        buttonRef.current.click();
      }
    }
  };
  return (
    <div className="md:h-24  h-20 shadow-md bg-white overflow-visible z-50 w-full ">
      <div className="md:container px-2 flex items-center justify-between">
        <Link href={"/"}>
          <div className="p-4 z-40 relative -translate-x-3 drop-shadow-lg flex items-center justify-center">
            <Image
              src={"/logo.png"}
              className="drop-shadow-md md:w-20 w-16 -translate-y-2"
              height={100}
              width={100}
              alt="main_logo"
            />
          </div>
        </Link>
        {/* <div className="hidden md:block">
          <SocialIcons />
        </div> */}
        <div className="flex items-center justify-center gap-1">
          <Link href={"/student-result"}>
            <Button className="hidden md:flex rounded-none bg-slate-200 hover:bg-slate-300 py-5 md:py-6 px-6 text-black">
              Student Result
            </Button>
          </Link>
          <Button
            className=" rounded-none  bg-yellow-500 hover:bg-yellow-600 py-5 md:py-6 px-6 text-black"
            onClick={() => handleClick()}
          >
            Branch login
          </Button>
          <LoginDialog>
            <div
              ref={buttonRef}
              className="md:p-3 p-2  hidden rounded-none bg-yellow-500 text-black"
            >
              dummy button
            </div>
          </LoginDialog>

          <SheetContext>
            <div className="text-white-500 text-white py-[10px] md:py-[14px] px-4 text-sm bg-black">
              menu
            </div>
          </SheetContext>
        </div>
      </div>
    </div>
  );
};

export default RootNavbar;
