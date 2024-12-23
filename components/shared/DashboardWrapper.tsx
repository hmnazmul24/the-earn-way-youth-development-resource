"use client";
import React, { ReactNode, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { managementInfo, SideBarInfoArr } from "@/components/data/index";
import { FaAngleRight, FaUserClock } from "react-icons/fa6";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BranchNav from "./BranchNav";
import { getUserAction } from "@/actions/auth";
import { useQuery } from "@tanstack/react-query";
import BranchLoading from "../branch/BranchLoading";
import PermissionBlock from "../admin/branches/PermissionBlock";
import OneTimePaymentAmount from "../admin/branches/OneTimePayment";
import { BsLayoutTextSidebar } from "react-icons/bs";
import { PiShirtFoldedFill } from "react-icons/pi";
import { GrMoney } from "react-icons/gr";
import { Button } from "../ui/button";
import useEssentialsHooks from "@/hooks/useEssentialHooks";
import { cn } from "@/lib/utils";
import PermissionBlockEmployee from "../admin/branches/PermissionBlockEmployee";
import EmployeeDeleted from "../admin/branches/employee/EmployeeBlock";

const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  const {
    isAllSalaryAccepted,
    employeeName,
    employeePosition,
    setEmployeePosition,
    setEmployeeName,
    isEmployeeActive,
    setIsEmployeeActive,
    isEmployeeDeleted,
    setIsEmployeeDeleted,
  } = useEssentialsHooks();

  const [open, setOpen] = useState<boolean>(true);
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const pathname = usePathname();
  let [disable, setDisable] = useState<boolean>(false);
  let [isOneTimePaid, setIsOneTimePaid] = useState<boolean>(true);
  let [oneTimeAmount, setOneTimeAmount] = useState<string>("0");
  let [needToPay, setNeedToPay] = useState<boolean>(true);

  // query the data
  const { data: branchData, isPending } = useQuery({
    queryKey: ["branch-initial-data"],
    queryFn: async () => {
      let data = await getUserAction();
      if (!data?.branchInfo) {
        return;
      }

      setDisable(data.branchInfo.disabled === true ? false : true);
      setRole(data.branchInfo.role);
      setIsOneTimePaid(data.branchInfo.isOneTimePaid);
      setNeedToPay(data.branchInfo.haveToPay);
      setOneTimeAmount(data.oneTimePayAmount);
      // for employee
      if (data.employee_name && data.employee_position) {
        setEmployeeName(data.employee_name);
        setEmployeePosition(data.employee_position);
        setIsEmployeeActive(data.is_employee_active!);
      }
      if (data.is_employee_deleted === true) {
        setIsEmployeeDeleted(true);
      }
      return data;
    },
  });

  return (
    <main className=" w-full">
      {isPending && <BranchLoading />}

      {!isEmployeeActive && <PermissionBlockEmployee />}
      {disable && <PermissionBlock />}
      {isEmployeeDeleted && <EmployeeDeleted />}
      {!isPending && !disable && needToPay && !isOneTimePaid && (
        <OneTimePaymentAmount
          amount={oneTimeAmount}
          email={branchData?.branchInfo?.branchInfo?.branchEmail!}
          id={branchData?.branchInfo?.id!}
          name={branchData?.branchInfo?.branchInfo?.branchName!}
          phone={branchData?.branchInfo?.branchInfo?.branchMobile!}
        />
      )}

      <BranchNav role={role} />
      <div className="flex items-start justify-start">
        <div
          className={`md:hidden p-1 bg-white rounded-r-md absolute top-5 text-sm left-0 ${
            open ? "hidden" : ""
          }`}
          onClick={() => setOpen(true)}
        >
          {<BsLayoutTextSidebar />}
        </div>
        <section
          className={`bg-white z-40  md:p-3 border-r-2 overflow-hidden  border-r-gray-300  shadow-sm  fixed  md:sticky top-0 left-0 h-screen transition-all ${
            open ? "w-[280px] p-3" : "w-0 md:w-[40px]"
          }`}
        >
          <div className={`flex items-center justify-end `}>
            <span
              onClick={() => setOpen(!open)}
              className="cursor-pointer  translate-x-1"
            >
              {<BsLayoutTextSidebar />}
            </span>
          </div>
          <Accordion type="single" collapsible>
            {SideBarInfoArr.map((item, index) => (
              <AccordionItem
                key={index}
                className="border-b-2 border-b-slate-300"
                value={`value-${index}`}
              >
                {open ? (
                  <AccordionTrigger className="">
                    <h1
                      className={`flex hover:translate-x-2 transition-all items-center justify-start gap-2 ${
                        item.items.filter((d) => d.link === pathname).length >
                          0 && "text-amber-500"
                      } `}
                    >
                      <span>{item.icon}</span>
                      <span className={`${open ? "" : "hidden"}} `}>
                        {item.title}
                      </span>
                    </h1>
                  </AccordionTrigger>
                ) : (
                  <h1
                    className={`py-4 ${
                      item.items.filter((d) => d.link === pathname).length >
                        0 && "text-amber-500"
                    }`}
                    onClick={() => setOpen(!open)}
                  >
                    {item.icon}
                  </h1>
                )}

                {open && (
                  <AccordionContent>
                    <ul>
                      {item.items.map((info, i) => (
                        <Link key={i} href={info.link}>
                          <li
                            className={`py-2  text-[16px]  flex items-center justify-start gap-1 ${
                              info.link === pathname && "text-amber-500"
                            }`}
                          >
                            {" "}
                            <FaAngleRight className="text-[10px]  ml-4" />
                            {info.title}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
          {!branchData?.employeeRole && !isPending ? (
            <div className="mt-5">
              {!isPending && (
                <fieldset className="border border-l-0 ">
                  {open && (
                    <legend className="p-2 text-sm text-green-500">
                      Managements
                    </legend>
                  )}
                  <ul className=" my *:cursor-pointer my-1">
                    <Link href={managementInfo.employeeLink}>
                      <li
                        data-state={
                          pathname === managementInfo.employeeLink
                            ? true
                            : false
                        }
                        className="py-1  hover:text-amber-500 flex items-center gap-2 data-[state=true]:text-amber-500"
                      >
                        <PiShirtFoldedFill />
                        {open && <span>Employees</span>}
                      </li>
                    </Link>
                    <Link href={managementInfo.salaryLink}>
                      <li
                        data-state={
                          pathname === managementInfo.salaryLink ? true : false
                        }
                        className="py-1  hover:text-amber-500 flex items-center gap-2 data-[state=true]:text-amber-500"
                      >
                        <GrMoney />
                        {open && <span>Salary</span>}
                      </li>
                    </Link>
                  </ul>
                </fieldset>
              )}
            </div>
          ) : (
            <div>
              {open && (
                <fieldset className="border border-l-0 pl-0 p-2 mt-5">
                  <legend className="text-xs text-blue-600">
                    about myself
                  </legend>
                  <div className=" ">
                    <div className="text-sm">
                      <h1 className="font-bold">{employeeName}</h1>
                      <h1 className="text-gray-400 text-sm">
                        {employeePosition}
                      </h1>
                    </div>
                    <Link href={"/branch/employee/salary"}>
                      <Button className="mt-2 w-full relative ">
                        Salary Info
                        <span
                          className={cn(
                            "inline-block size-3 rounded-full  absolute -top-1  -right-1 bg-green-500",
                            !isAllSalaryAccepted
                              ? "animate-ping"
                              : "bg-transparent"
                          )}
                        ></span>
                      </Button>
                    </Link>
                  </div>
                </fieldset>
              )}
            </div>
          )}
        </section>
        <section className="bg-slate-500 max-w-screen-2xl p-1 relative md:p-0 w-full ">
          {children}
        </section>
      </div>
    </main>
  );
};

export default DashboardWrapper;
