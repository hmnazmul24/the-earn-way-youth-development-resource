"use client";

import { getSingleStudentResult } from "@/actions/result";
import { generateStudentResultPDF } from "@/components/data/pdf-func";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentResultPDFtype } from "@/types/pdf";
import { useMutation } from "@tanstack/react-query";

import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";

const StudentResult = () => {
  const [roll, setRoll] = useState<string>("");
  const [reg, setReg] = useState<string>("");
  const [isBothFilled, setIsBothFilled] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // get retsult
  const { isPending, data, mutate } = useMutation({
    mutationFn: getSingleStudentResult,
  });

  // download result
  const hanldeSearch = (e: FormEvent) => {
    e.preventDefault();
    mutate({ reg, roll });
  };

  const handleDownload = async () => {
    if (data?.result) {
      setLoading(true);
      const student: StudentResultPDFtype = {
        name: data.result.name,
        fatherName: data.result.fatherName,
        motherName: data.result.motherName,
        rollNo: data.result.genReg!,
        regNo: data.result.genReg!,
        result: data.result.genResult!,
        branch: data.result.branch.branchInfo?.branchName!,
        photoUrl: data.result.profileDoc?.secure_url!,
        logoPath: "/logo.png", // Path in the public folder
      };
      await generateStudentResultPDF(student);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reg && roll) {
      setIsBothFilled(true);
    } else {
      setIsBothFilled(false);
    }
  }, [roll, reg]);
  return (
    <div className="sm:container m-auto p-4 grid mt-5 md:mt-10 md:grid-cols-[1fr_1.5fr] gap-2">
      <div>
        <h1 className="text-sm text-emerald-500 mb-2">
          NB: Enter your Roll number and Registration Number and hit the search
          button to get your Result.
        </h1>
        <form
          className=" grid grid-cols-[1fr,1fr,0.4fr] gap-1"
          onSubmit={hanldeSearch}
        >
          <Input
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            type="text"
            placeholder="Enter Roll No."
            className="rounded-none"
          />
          <Input
            value={reg}
            onChange={(e) => setReg(e.target.value)}
            type="text"
            placeholder="Enter Reg. No."
            className="rounded-none"
          />
          <Button
            data-state={isBothFilled}
            disabled={isPending}
            type="submit"
            className="rounded-none bg-green-600 data-[state=false]:bg-gray-500 "
          >
            Search
          </Button>
        </form>
      </div>
      <div className=" py-5 bg-gray-100 text-center">
        {isPending ? (
          // <div className="text-sm text-gray-500">not found.</div>
          <div className="text-sm">Searching...</div>
        ) : data?.result ? (
          <div>
            <div
              ref={componentRef}
              className="w-[90vw] md:w-auto m-auto overflow-x-auto"
            >
              <div className="w-[700px] m-auto bg-white">
                <div>
                  <div className="p-2 pt-5 z-40 relative -translate-x-3 drop-shadow-lg flex items-center justify-center">
                    <Image
                      src={"/logo.png"}
                      className="drop-shadow-md  w-10 -translate-y-2"
                      height={100}
                      width={100}
                      alt="main_logo"
                    />
                  </div>
                  <h1 className=" mb-4">
                    The Earn Way Youth Development Resource
                  </h1>
                  <div className="grid grid-cols-[4fr_1fr]">
                    <ul className="text-sm p-4 text-start space-y-1  ">
                      <li className="grid grid-cols-[0.8fr,0.1fr,1.2fr] justify-items-start">
                        <span>Name</span>
                        <span>:</span>
                        <span>{data.result.name} </span>
                      </li>
                      <li className="grid grid-cols-[0.8fr,0.1fr,1.2fr] justify-items-start">
                        <span>Father Name</span>
                        <span>:</span>
                        <span>{data.result.fatherName}</span>
                      </li>
                      <li className="grid grid-cols-[0.8fr,0.1fr,1.2fr] justify-items-start">
                        <span>Mother Name</span>
                        <span>:</span>
                        <span>{data.result.motherName}</span>
                      </li>
                      <li className="grid grid-cols-[0.8fr,0.1fr,1.2fr] justify-items-start">
                        <span>Roll No.</span>
                        <span>:</span>
                        <span>{data.result.genRoll}</span>
                      </li>
                      <li className="grid grid-cols-[0.8fr,0.1fr,1.2fr] justify-items-start">
                        <span>Reg. No. </span>
                        <span>:</span>
                        <span>{data.result.genReg}</span>
                      </li>
                      <li className="grid grid-cols-[0.8fr,0.1fr,1.2fr] justify-items-start">
                        <span>Result </span>
                        <span>:</span>
                        <span>{data.result.genResult ?? "not provided"}</span>
                      </li>
                      <li className="grid grid-cols-[0.8fr,0.1fr,1.2fr] justify-items-start">
                        <span>Branch</span>
                        <span>:</span>
                        <span>{data.result.branch.branchInfo?.branchName}</span>
                      </li>
                    </ul>
                    <Image
                      src={data.result.profileDoc?.secure_url!}
                      height={70}
                      width={70}
                      alt="student-img"
                      className="mt-3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3 w-full flex items-center justify-center">
              {loading ? (
                <Button disabled={true}>Processing...</Button>
              ) : (
                <Button onClick={handleDownload}>PDF download</Button>
              )}
            </div>
          </div>
        ) : (
          <div className="">
            <Image
              src={"/not-found.png"}
              height={200}
              width={200}
              alt="not-found"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResult;
