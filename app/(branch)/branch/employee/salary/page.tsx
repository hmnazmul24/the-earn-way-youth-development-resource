"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  getEmployeesWithSalaryInfo,
  getSingleEmployeeWithSalaryInfo,
} from "@/actions/employee/employee";
import { Fragment, useState } from "react";
import { cn } from "@/lib/utils";
import SalaryTable from "../../salary-management/_components/SalaryTable";

const SalaryMangement = () => {
  const { isPending, data } = useQuery({
    queryKey: ["single-employee-with-salary-info"],
    queryFn: async () => {
      let data = await getSingleEmployeeWithSalaryInfo();
      return data;
    },
  });

  if (isPending) {
    return <div>Loading....</div>;
  }

  if (data?.employee === null) {
    return <div>something went wrong</div>;
  }

  return (
    <Fragment>
      {data?.employee ? (
        <div className="grid lg:grid-cols-[1fr_3fr] lg:gap-5 p-4 md:p-0">
          <div className="">
            <h1 className="text-sm p-2 text-green-700 ">Employee</h1>
            <ul className=" bg-gray-100 flex lg:block overflow-x-auto lg:space-y-1">
              <li
                className={cn(
                  "p-3 flex-none py-1 bg-white rounded-md hover:border-emerald-500 border-2  bg-green-500/10 border-green-400"
                )}
              >
                <h1 className="font-semibold">{data.employee.fullName}</h1>
                <h2 className="text-sm text-gray-500">
                  {data.employee.position}
                </h2>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-emerald-400/30 rounded-md mt-4 lg:mt-0  p-2 md:p-6">
            <div className=" flex gap-2 items-end">
              <Image
                src={data.employee.secure_url}
                height={100}
                width={100}
                alt="employee"
                className="size-20 rounded-md shadow "
              ></Image>
              <h1 className="font-semibold ">
                Salary :{" "}
                <span className="font-salsa text-green-700">
                  &#2547;{data.employee.fixedSalary}
                </span>
              </h1>
            </div>
            <div>
              <SalaryTable isEmployee={true} employee={data.employee} />
            </div>
          </div>
        </div>
      ) : (
        <div>something went wrong !</div>
      )}
    </Fragment>
  );
};

export default SalaryMangement;
