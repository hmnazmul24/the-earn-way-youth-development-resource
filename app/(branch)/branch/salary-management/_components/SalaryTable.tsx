"use client";

import { acceptSalary, deleteSalary } from "@/actions/employee/employee";
import { customToast } from "@/components/shared/ToastContainer";
import useEssentialsHooks from "@/hooks/useEssentialHooks";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import AddSalaryModal from "./AddSalaryModal";

// employee type

type Salary = {
  id: string;
  amount: number;
  month: string;
  monthIndex: number;
  year: number;
  method: string;
  status: "awaiting" | "accepted";
  employeeId: string;
  createdAt: Date;
  updatedAt: Date;
};

type EmployeeType = {
  id: string;
  fullName: string;
  position: string;
  secure_url: string;
  salaries: Salary[];
};

type GroupedSalaries = {
  year: number;
  salaries: Salary[];
};

function groupAndSortSalaries(salaries: Salary[]): GroupedSalaries[] {
  // Group salaries by year
  const grouped = salaries.reduce<Record<number, Salary[]>>((acc, salary) => {
    if (!acc[salary.year]) {
      acc[salary.year] = [];
    }
    acc[salary.year].push(salary);
    return acc;
  }, {});

  // Convert grouped object into an array of years with sorted salaries
  const result = Object.keys(grouped)
    .map((year) => ({
      year: parseInt(year, 10), // Convert string keys to numbers
      salaries: grouped[parseInt(year, 10)].sort(
        (a, b) => a.monthIndex - b.monthIndex
      ), // Sort by monthIndex
    }))
    .sort((a, b) => a.year - b.year); // Sort years in ascending order

  return result;
}

const SalaryTable = ({
  employee,
  isEmployee = false,
}: {
  employee: EmployeeType;
  isEmployee?: boolean;
}) => {
  const queryclient = useQueryClient();
  const { setIsAllSalaryAccepted } = useEssentialsHooks();
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const groupedData = groupAndSortSalaries(employee.salaries);

  // filtered info to show
  let salaryInfo = groupedData.filter((item) => item.year === selectedYear);

  // accepted salary
  const { isPending, mutate } = useMutation({
    mutationFn: acceptSalary,
    onSuccess: async ({ message }) => {
      if (message) {
        customToast("success", message);
        await queryclient.invalidateQueries({
          queryKey: ["single-employee-with-salary-info"],
        });
      }
    },
  });

  // accepted salary
  const { isPending: delete_pending, mutate: delete_mutate } = useMutation({
    mutationFn: deleteSalary,
    onSuccess: async ({ message }) => {
      if (message) {
        customToast("success", message);
        await queryclient.invalidateQueries({
          queryKey: ["employee-with-salary-info"],
        });
      }
    },
  });

  return (
    <div className="">
      <div className="mt-8 max-w-6xl mx-auto p-2 md:p-6  text-base bg-gray-50 shadow-sm rounded-lg">
        <div className="w-full flex items-center justify-between  mb-1">
          <h1 className="text-black text-lg  lg:mt-0 font-semibold">
            Employee Salary Records
          </h1>
          {!isEmployee && (
            <AddSalaryModal id={employee.id}>
              <div className="p-1 shadow-md px-3 bg-blue-600 text-white rounded-md">
                Add Salary
              </div>
            </AddSalaryModal>
          )}
        </div>
        {/* render info  */}
        <ul className="flex items-center justify-start gap-2">
          {groupedData.map((item) => (
            <li
              key={item.year}
              onClick={() => setSelectedYear(item.year)}
              className={cn(
                "px-3 py-2 rounded-md shadow-md cursor-pointer ",
                selectedYear === item.year &&
                  "border-2 border-green-500  bg-green-500/10"
              )}
            >
              {item.year}
            </li>
          ))}
        </ul>
        <div className="bg-white shadow-md  rounded-md my-5 md:p-4">
          <ul
            className={cn(
              "grid grid-cols-[3fr_2fr_1fr] md:grid-cols-[2fr_4fr_3fr_2fr_1.5fr] p-2 py-3 bg-whiter  bg-gray-400/20 rounded-md *:font-semibold "
            )}
          >
            <li>Month</li>
            <li className="hidden md:block">Send Date</li>
            <li className="hidden md:block">Method</li>
            <li className="place-self-end   pr-5">Amount</li>
            <li className=" px-2">Status</li>
          </ul>
          {salaryInfo.length !== 0 &&
            salaryInfo[0].salaries.map((item, i) => (
              <ul
                key={i}
                className={cn(
                  "grid grid-cols-[3fr_2fr_1fr] md:grid-cols-[2fr_4fr_3fr_2fr_1.5fr] p-2 py-3 bg-whiter  ",
                  i !== 0 &&
                    item.month !== salaryInfo[0].salaries[i - 1].month &&
                    "border-t border-t-gray-300"
                )}
              >
                <li
                  className={cn(
                    i !== 0 &&
                      item.month === salaryInfo[0].salaries[i - 1].month &&
                      "invisible"
                  )}
                >
                  {item.month}
                </li>
                <li className="hidden md:block">
                  {item.createdAt.toLocaleString()}
                </li>
                <li className="hidden md:block">{item.method}</li>
                <li className="place-self-end font-salsa  pr-5">
                  {item.amount}
                </li>
                {!isEmployee ? (
                  <li
                    className={cn(
                      " px-2  flex items-center justify-between text-xs",
                      item.status === "awaiting"
                        ? "text-yellow-500 "
                        : "text-green-500"
                    )}
                  >
                    {item.status}
                    {item.status === "awaiting" && (
                      <div
                        onClick={() => delete_mutate({ salaryId: item.id })}
                        className=" size-5 rounded-full bg-red-500/20 flex items-center justify-center ml-1"
                      >
                        <MdOutlineDelete className="text-red-500  cursor-pointer" />
                      </div>
                    )}
                  </li>
                ) : item.status === "awaiting" ? (
                  <li
                    onClick={() => {
                      if (!isPending) {
                        mutate({ salaryId: item.id });
                      }
                    }}
                  >
                    <span className="inline-block text-xs p-1  rounded-md shadow-md bg-green-500 px-3 text-white cursor-pointer">
                      Accept
                    </span>
                  </li>
                ) : (
                  <li>
                    <span className="inline-block p-1 text-xs  rounded-md shadow-md bg-gray-500 px-3 text-white cursor-pointer">
                      Accepted
                    </span>
                  </li>
                )}
              </ul>
            ))}
        </div>
        {/* Empty State */}
        {employee.salaries.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p>No salary records available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryTable;
