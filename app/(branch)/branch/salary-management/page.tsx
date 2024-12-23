"use client";

import Image from "next/image";
import SalaryTable from "./_components/SalaryTable";
import { useQuery } from "@tanstack/react-query";
import { getEmployeesWithSalaryInfo } from "@/actions/employee/employee";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SalaryMangement = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const { isPending, data } = useQuery({
    queryKey: ["employee-with-salary-info"],
    queryFn: async () => {
      let data = await getEmployeesWithSalaryInfo();
      if (data.employees?.length !== 0) {
        if (!selectedId) {
          setSelectedId(data.employees![0].id);
        }
      }
      return data;
    },
  });

  if (isPending) {
    return <div>Loading....</div>;
  }

  const selectedEmployee = () => {
    const info = data?.employees?.filter((item) => item.id === selectedId)[0]!;
    return info;
  };

  return (
    <div className="grid lg:grid-cols-[1fr_3fr] lg:gap-5 p-4 md:p-0">
      <div className="">
        <h1 className="text-sm p-2 text-green-700 ">Employees</h1>
        <ul className=" bg-gray-100 flex lg:block overflow-x-auto lg:space-y-1">
          {data?.employees?.map((item) => (
            <li
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={cn(
                "p-3 flex-none py-1 bg-white rounded-md hover:border-emerald-500 border-2",
                selectedId === item.id && "bg-green-500/10 border-green-400"
              )}
            >
              <h1 className="font-semibold">{item.fullName}</h1>
              <h2 className="text-sm text-gray-500">{item.position}</h2>
            </li>
          ))}
        </ul>
      </div>
      {data?.employees?.length !== 0 && selectedEmployee() && (
        <div className="bg-white border-2 border-emerald-400/30 rounded-md mt-4 lg:mt-0  p-2 md:p-6">
          <div className=" flex gap-2 items-end">
            <Image
              src={selectedEmployee().secure_url}
              height={100}
              width={100}
              alt="employee"
              className="size-20 rounded-md shadow "
            ></Image>
            <h1 className="font-semibold ">
              Salary :{" "}
              <span className="font-salsa text-green-700">
                &#2547;{selectedEmployee().fixedSalary}
              </span>
            </h1>
          </div>
          <div>
            <SalaryTable employee={selectedEmployee()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryMangement;
