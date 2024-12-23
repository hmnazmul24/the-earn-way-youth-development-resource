"use client";

import { admin_AllFilteredStudentsOfBranch } from "@/actions/studentsForAdmin/giveResult";
import PublishResult from "@/components/admin/branches/branchStudent/PublishResult";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditResultType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdRadioButtonChecked } from "react-icons/md";
import { PiShareNetworkFill } from "react-icons/pi";
import CertificateModel from "@/app/(admin)/_certificate/CertificateModel";

const FilteredStudentsPage = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FilteredStudents id={params.id} />
    </Suspense>
  );
};

const FilteredStudents = ({ id }: { id: string }) => {
  const params = useSearchParams();
  const trade = params.get("trade") as string;
  const duration = params.get("duration") as string;
  const [selectCourse, setSelectCourse] = useState<string>("");
  const [seacrhRoll, setSearchRoll] = useState<string | string>("");

  const { data, isPending } = useQuery({
    queryKey: ["filteredStudentOfBranchForAdmin"],
    queryFn: async () => {
      let data = await admin_AllFilteredStudentsOfBranch({
        id,
        trade,
        duration,
      });

      let courseRangeName = [
        ...new Set(data?.filteredStudent?.map((item) => item.courseRange)),
      ];
      setSelectCourse(courseRangeName[0]);
      return data;
    },
  });

  if (isPending) {
    return <div>loading...</div>;
  }

  let courseRangeName = [
    ...new Set(data?.filteredStudent?.map((item) => item.courseRange)),
  ];

  let FilterStudents = (text: string | undefined) => {
    let selected_course = data?.filteredStudent?.filter(
      (item) => item.courseRange === selectCourse
    );
    if (text !== undefined) {
      selected_course = selected_course!.filter(
        (info) =>
          info.genReg && info.genReg.toString().includes(text.toString())
      );
    }

    return selected_course;
  };

  let FilterStudentsForUpdate = (
    selectCourse: string
  ): EditResultType[] | null => {
    let selected_course = data?.filteredStudent?.filter(
      (item) => item.courseRange === selectCourse
    );

    let info = selected_course!.map((item) => ({
      id: item.id,
      roll: item.genRoll!,
      result: item.genResult,
    }))!;
    return info;
  };

  return (
    data && (
      <div>
        <div className="mb-2 shadow-lg p-3 bg-amber-100">
          <h1 className=" text-[1.3rem] md:text-[2rem]">Trade : {trade}</h1>
          <h1 className=" my-2 text-[1rem] md:text-[1.5rem]">
            Duration : {duration}
          </h1>
        </div>
        <div className=" rounded-md grid items-start grid-cols-1 md:grid-cols-[1.2fr_2fr_0.7fr] gap-3">
          <div className="bg-white shadow-md p-3">
            <h1 className="text-blue-500 underline">All courses </h1>
            <ul>
              {courseRangeName.map((item, i) => (
                <li
                  key={i}
                  onClick={() => setSelectCourse(item)}
                  className={`my-1 flex hover:bg-sky-100 border rounded-md p-2 items-center justify-between  ${
                    item === selectCourse && "border-blue-500 bg-sky-100"
                  }`}
                >
                  {item}
                  {item === selectCourse && (
                    <MdRadioButtonChecked className="text-green-600" />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Input
              type="number"
              value={seacrhRoll}
              onChange={(e) => setSearchRoll(e.target.value)}
              className="w-full bg-white shadow-md py-6 mb-4 border border-sky-200"
              placeholder="Search by roll here..."
            />

            <ul className="bg-white p-4 shadow-md">
              <li className="grid p-2 border-b-gray-400 tex-sm border-b bg-sky-100 rounded-sm hover:bg-sky-200 grid-cols-4">
                <span>roll</span>
                <span>reg. no</span>
                <span>result</span>
                <span>certificate</span>
              </li>
              {FilterStudents(seacrhRoll)!.map((item, i) => (
                <li
                  key={i}
                  className="grid p-2 border-b-gray-300 tex-sm border-b bg-stone-100 rounded-sm hover:bg-stone-200 grid-cols-4"
                >
                  <span>{item.genRoll}</span>
                  <span>{item.genReg}</span>
                  <span>
                    {item.genResult ?? (
                      <span className="text-red-700 text-sm">Not Provided</span>
                    )}
                  </span>
                  <span className="text-[0.8rem] flex items-center justify-center gap-3">
                    {item.genResult ? (
                      <CertificateModel id={item.id}>
                        Get Certificate
                      </CertificateModel>
                    ) : (
                      <div className="bg-slate-400 rounded-md  text-[13px] py-1 px-3">
                        Get Certificate
                      </div>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <PublishResult studentData={FilterStudentsForUpdate(selectCourse)}>
            <div className="rounded-md shadow-lg px-3 py-2 flex flex-col items-center justify-center bg-white  border-black">
              publish results{" "}
              <span className="p-2 rounded-full bg-blue-500 text-white">
                <PiShareNetworkFill className="" />
              </span>
            </div>
          </PublishResult>
        </div>
      </div>
    )
  );
};

export default FilteredStudentsPage;
