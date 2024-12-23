"use client";
import React, { ReactNode, useState } from "react";

import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdminNav from "./AdminNav";
import { AdminLinks } from "../data";
import { RxHamburgerMenu } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import { getUserAction } from "@/actions/auth";
import AdminLoading from "./AdminLoading";

const AdminDashboardWrapper = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const router = useRouter();
  const pathname = usePathname();
  const { isPending } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      let data = await getUserAction();

      if (!data?.branchInfo || data.branchInfo?.role === "USER") {
        return router.push("/");
      }
      setRole(data.branchInfo.role);

      return data;
    },
  });

  return (
    <main className=" w-full">
      {isPending && <AdminLoading />}
      {/* {loading && <AdminLoading />} */}
      <AdminNav role={role} />
      <div className="flex items-start justify-start">
        <div
          className={`md:hidden p-1 bg-white rounded-r-full absolute top-5 text-sm left-0 ${
            open ? "hidden" : ""
          }`}
          onClick={() => setOpen(true)}
        >
          {open ? <FaAnglesLeft /> : <FaAnglesRight />}
        </div>
        <section
          className={`bg-white z-40  md:p-3 border-r-2 overflow-hidden  border-r-gray-300  shadow-sm  fixed  md:sticky top-0 left-0 h-screen transition-all ${
            open ? "w-[280px] p-3" : "w-0 md:w-[40px]"
          }`}
        >
          <div className={`flex items-center justify-end `}>
            <span onClick={() => setOpen(!open)} className="cursor-pointer">
              <RxHamburgerMenu className="font-bold" />
            </span>
          </div>
          <ul className="mt-5">
            {AdminLinks.map((item) => (
              <Link key={item.title} href={item.link}>
                {" "}
                <li
                  className={`flex my-3 hover:translate-x-2 transition-all items-center justify-start gap-3 ${
                    pathname === item.link ? "text-blue-600" : ""
                  }`}
                >
                  <span>{item.icon}</span>
                  {open && <span>{item.title}</span>}
                </li>
              </Link>
            ))}
          </ul>
        </section>
        <section className="bg-slate-50 max-w-screen-2xl p-1 relative md:p-0 w-full ">
          {children}
        </section>
      </div>
    </main>
  );
};

export default AdminDashboardWrapper;
