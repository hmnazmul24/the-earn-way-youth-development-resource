"use client";

import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { branchLogoutAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BranchNav = ({ role }: { role: "USER" | "ADMIN" }) => {
  const router = useRouter();
  return (
    <div className="h-20 px-3 border-b-2 border-b-gray-500 bg-yellow-500 flex items-center justify-between shadow-md ">
      <div className="flex items-center justify-center gap-3">
        <Image
          height={60}
          width={60}
          alt="main-logo"
          className=" drop-shadow-lg"
          src={"/logo.png"}
        />
        <div className="max-w-sm  text-[1.2 rem] text-[#ad3c03f7] font-bold">
          The Earn Way Youth Development Resource
        </div>
      </div>
      <div className="md:pr-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsPersonCircle className="text-lg " />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className=" ">
            {role === "ADMIN" && (
              <Link href={"/admin/analytics"}>
                <DropdownMenuItem className="cursor-pointer text-green-500">
                  Dashboard
                </DropdownMenuItem>
              </Link>
            )}
            <Link href={"/branch/billings/payment-history"}>
              <DropdownMenuItem className="cursor-pointer">
                Payments
              </DropdownMenuItem>
            </Link>
            <Link href={"/branch/my-branch/profile"}>
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => {
                branchLogoutAction();
                router.push("/");
              }}
            >
              logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BranchNav;
