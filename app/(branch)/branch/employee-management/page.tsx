"use client";

import {
  allEmployees,
  employeeDelete,
  updateSalary,
} from "@/actions/employee/employee";
import { customToast } from "@/components/shared/ToastContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CreateEmployeeDialouge from "./_components/CreateEmployeeDialoge";
import EmployeeCredentials from "./_components/EmployeeCredentials";

const leftConfirmText = "this employee has left";

const EmployManagement = () => {
  const quaryClient = useQueryClient();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const [salary, setSalery] = useState<string>("");
  const [text, settext] = useState<string>("");

  //getting the employee info
  const { isPending, data } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      let data = await allEmployees();
      if (data.employees?.length !== 0) {
        setSelectedEmployeeId(data.employees![0].id!);
        setSalery(data.employees![0].fixedSalary!.toString());
      }
      return data;
    },
  });

  // delete employee
  const { isPending: delete_pending, mutate: deleteMutate } = useMutation({
    mutationFn: employeeDelete,
    onSuccess: async ({ message }) => {
      if (message) {
        customToast("success", message);
        await quaryClient.invalidateQueries({ queryKey: ["employees"] });
      }
    },
  });

  // update salary
  const { isPending: update_pending, mutate: updateMutate } = useMutation({
    mutationFn: updateSalary,
    onSuccess: async ({ message, error }) => {
      if (message) {
        customToast("success", message);
        await quaryClient.invalidateQueries({ queryKey: ["employees"] });
      }
      if (error) return customToast("error", error);
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  const selectedData = () => {
    let info = data?.employees?.filter(
      (item) => item.id === selectedEmployeeId
    )!;
    return info[0];
  };

  return (
    <div className="grid lg:grid-cols-[1fr_3fr] lg:gap-5 p-4 md:p-0">
      <div>
        <CreateEmployeeDialouge>
          <div className="w-full py-2 px-4 text-center">Create Employee</div>
        </CreateEmployeeDialouge>
        <h1 className="text-sm mt-3 p-2 text-green-500 ">Employees</h1>
        {data?.employees?.length === 0 || selectedEmployeeId === null ? (
          <div></div>
        ) : (
          <ul className=" bg-gray-100 flex lg:block lg:space-y-1 overflow-x-auto gap-2">
            {data?.employees?.map((item, i) => (
              <li
                key={i}
                onClick={() => {
                  setSelectedEmployeeId(item.id);
                  setSalery(item.fixedSalary.toString());
                }}
                className={cn(
                  "p-3 flex-none py-1 cursor-pointer bg-white rounded-md hover:border-emerald-500 border-2",
                  selectedEmployeeId === item.id &&
                    "border-emerald-500 border-2 bg-emerald-500/10"
                )}
              >
                <h1 className="font-semibold text-lg">{item.fullName}</h1>
                <h2 className="text-xs text-gray-500"> {item.position}</h2>
              </li>
            ))}
          </ul>
        )}
      </div>
      {data?.employees?.length === undefined ||
      (data.employees.length < 1 && selectedData()) ||
      selectedEmployeeId === null ? (
        <div className=" pl-2">
          {"There is no employee you have. Create one :)"}
        </div>
      ) : (
        <div className="bg-white border-2 border-emerald-400/30 rounded-md mt-4 lg:mt-0 p-6">
          <h1 className="text-emerald-500  text-lg  lg:mt-0 font-semibold mb-5">
            <span> Employee Details </span>
          </h1>
          <div>
            <Image
              src={selectedData().secure_url}
              height={300}
              width={300}
              alt="employee"
              className="size-32 rounded-md shadow  object-cover"
            ></Image>
          </div>
          <div className="lg:grid lg:grid-cols-2  mt-3 text-base  gap-4">
            <ul className="bg-sky-50 border border-sky-500/20 shadow-sm mb-2 lg:mb-0 p-4 rounded-sm">
              <li className="grid grid-cols-[1fr_0.1fr_2fr] place-items-start">
                <span>Full Name</span>
                <span>:</span>
                <span>{selectedData().fullName}</span>
              </li>
              <li className="grid grid-cols-[1fr_0.1fr_2fr] place-items-start">
                <span>Father Name</span>
                <span>:</span>
                <span>{selectedData().fatherName}</span>
              </li>

              <li className="grid grid-cols-[1fr_0.1fr_2fr] place-items-start">
                <span>Address</span>
                <span>:</span>
                <span>{selectedData().address}</span>
              </li>
              <li className="grid grid-cols-[1fr_0.1fr_2fr] place-items-start">
                <span>Contact No.</span>
                <span>:</span>
                <span>{selectedData().phoneNumber}</span>
              </li>
              <li className="grid grid-cols-[1fr_0.1fr_2fr] place-items-start">
                <span>Position</span>
                <span>:</span>
                <span>{selectedData().position}</span>
              </li>
              <li className="grid grid-cols-[1fr_0.1fr_2fr] place-items-start">
                <span>Joinded At</span>
                <span>:</span>
                <span>{selectedData().joinedAt.toLocaleString()}</span>
              </li>
            </ul>
            <ul className="bg-sky-50 border border-sky-500/20 shadow-sm self-start p-4 space-y-3 rounded-sm">
              <li className="grid grid-cols-[1fr_0.1fr_2fr] place-items-start">
                <span>Salary</span>
                <span>:</span>
                <span className="text-lg relative text-blue-500  font-semibold">
                  {selectedData().fixedSalary} tk
                </span>
              </li>
              <li className="grid grid-cols-[1fr_0.1fr_2fr] place-items-start">
                <span>Salary History</span>
                <span>:</span>
                <Link
                  href={`/branch/salary-management?id=${selectedData().id}`}
                >
                  <span className="text-sm relative inline-block py-0 text-blue px-2  rounded-lg shadow-sm font-semibold bg-blue-600/20 cursor-pointer">
                    Manage
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:grid-cols-2 gap-3 lg:grid text-base">
            <div className=" mt-5 ">
              <div className="p-3 bg-green-400/10 rounded-md border border-green-500/20">
                <h1 className="my-1">Update salary</h1>
                <form
                  className="flex items-center gap-2 justify-stretch"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (salary && Number(salary) > 100) {
                      updateMutate({
                        employeeId: selectedEmployeeId,
                        updatedSalary: Number(salary!),
                      });
                    } else {
                      customToast("error", "give a proper salary");
                    }
                  }}
                >
                  <Input
                    onChange={(e) => setSalery(e.target.value)}
                    type="number"
                    value={salary}
                    placeholder="update salary"
                    className="bg-white"
                  />
                  <Button
                    disabled={update_pending}
                    type="submit"
                    variant={"outline"}
                  >
                    Update
                  </Button>
                </form>
              </div>
              {/* credentials  */}
              <EmployeeCredentials
                password={selectedData().password}
                userName={selectedData().username}
                id={selectedData().id}
                isActive={selectedData().active}
              />
              <div className="p-3 border border-red-500/20 bg-red-400/10 rounded-md mt-5">
                <h1 className="my-1 text-red-500">Delete Employee </h1>
                <p className=" text-sm my-1">
                  Text:&quot;
                  <span className="text-amber-500">{leftConfirmText}</span>
                  &quote;
                </p>
                <form
                  className="flex items-center gap-2 justify-stretch"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (text.trim() === leftConfirmText.trim()) {
                      deleteMutate({
                        employeeId: selectedEmployeeId!,
                        imagePublicId: selectedData().public_id,
                      });
                      if (data.employees?.length === 1) {
                        setSelectedEmployeeId(null);
                      }
                      if (
                        data.employees?.length !== undefined &&
                        data.employees.length > 1
                      ) {
                        let filterInfo = data.employees.filter(
                          (item) => item.id !== selectedEmployeeId
                        );
                        setSelectedEmployeeId(filterInfo[0].id);
                      }
                      settext("");
                    } else {
                      customToast("error", "write the above text correctly");
                    }
                  }}
                >
                  <Input
                    type="text"
                    value={text}
                    onChange={(e) => settext(e.target.value)}
                    className="bg-white"
                    placeholder="enter the above text.."
                  />
                  <Button
                    disabled={delete_pending}
                    type="submit"
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </form>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployManagement;
