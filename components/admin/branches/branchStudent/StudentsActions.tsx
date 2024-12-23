"use clinet";
import { admin_AllStudentsOfBranch } from "@/actions/studentsForAdmin/giveResult";
import {
  courseDurationInfo,
  courseNameArr,
} from "@/components/data/array_info";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaExpand } from "react-icons/fa";

const StudentsActions = ({ id }: { id: string }) => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<string>(
    "Computer Office Application"
  );

  const { data, isPending } = useQuery({
    queryKey: ["random"],
    queryFn: async () => {
      let data = await admin_AllStudentsOfBranch({ id });
      return data;
    },
  });
  if (isPending) {
    return <div>loading...</div>;
  }
  const filteredCourse = () => {
    let info = data?.allStudents?.filter(
      (d) => d.courseTrade === selectedCourse
    );
    return info;
  };

  return (
    <div className="p-4 rounded-md grid items-start grid-cols-1 md:grid-cols-[0.8fr_2fr_1fr] gap-3">
      <div className="bg-white shadow-md p-4 flex items-center justify-center gap-4">
        <BsFillPeopleFill className="text-[3rem] text-blue-500" />
        <span className="text-[2rem] text-green-500 font-salsa">
          {data?.allStudents?.length}
        </span>
        <span>Students</span>
      </div>
      <ul className="bg-white shadow-md p-4">
        {courseNameArr.map((item, i) => (
          <li
            key={i}
            className={`p-4 py-2 rounded-md cursor-pointer my-1 hover:bg-sky-200 bg-sky-100 shadow-sm ${
              item === selectedCourse && "border-2 border-blue-500"
            }`}
            onClick={() => {
              setSelectedCourse(item);
            }}
          >
            {i + 1}. {item}
            <span className="font-mono">
              (
              {
                data?.allStudents?.filter((info) => info.courseTrade === item)
                  .length
              }
              )
            </span>
          </li>
        ))}
      </ul>
      <ul className="bg-white shadow-md p-4">
        {courseDurationInfo.map((item, i) => (
          <li
            key={i}
            className="flex transition-all hover:bg-slate-200 items-center my-1 bg-slate-100 rounded-md p-1 px-3 justify-between gap-3"
          >
            <span>
              {item.course_duration}{" "}
              <span className="font-mono">
                (
                {
                  filteredCourse()?.filter(
                    (info) => info.courseDuration === item.course_duration
                  ).length
                }
                )
              </span>
            </span>
            <span
              className="text-sm  cursor-pointer"
              onClick={() => {
                let length = filteredCourse()?.filter(
                  (info) => info.courseDuration === item.course_duration
                ).length;
                if (length !== undefined && length > 0) {
                  router.push(
                    `/admin/branches/${id}/students?trade=${selectedCourse}&duration=${item.course_duration}`
                  );
                }
              }}
            >
              <FaExpand />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsActions;
