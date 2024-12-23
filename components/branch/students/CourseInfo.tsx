"use client";
import React from "react";
import {
  bloodGroups,
  courseDurationInfo,
  courseNameArr,
} from "@/components/data/array_info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStudentStore from "@/hooks/useStudentStore";

const CourseInfo = () => {
  const current_year = new Date().getFullYear();
  const { studentInfo, setStudentInfo } = useStudentStore();

  return (
    <section className="bg-white p-4 rounded-sm mb-3">
      <h1 className="branch_heading">Course Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_0.7fr] gap-4 md:gap-16">
        <div className="flex items-center flex-col gap-3">
          <Select
            value={studentInfo.courseTrade}
            onValueChange={(value) => setStudentInfo({ courseTrade: value })}
          >
            <SelectTrigger className="w-full branch_input">
              <SelectValue placeholder="Select Trade" />
            </SelectTrigger>
            <SelectContent>
              {courseNameArr.map((item, i) => (
                <SelectItem key={i} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={studentInfo.courseDuration}
            onValueChange={(value) => setStudentInfo({ courseDuration: value })}
          >
            <SelectTrigger className="w-full branch_input">
              <SelectValue placeholder="Course Duration" />
            </SelectTrigger>
            <SelectContent>
              {courseDurationInfo.map((item, i) => (
                <SelectItem key={i} value={item.course_duration}>
                  {item.course_duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center flex-col gap-3">
          <Select
            value={studentInfo.courseRange}
            onValueChange={(value) => setStudentInfo({ courseRange: value })}
          >
            <SelectTrigger className="w-full branch_input">
              <SelectValue placeholder="Course Range" />
            </SelectTrigger>
            <SelectContent>
              {studentInfo.courseDuration !== "" &&
                courseDurationInfo.map((item) =>
                  item.month_range.map(
                    (range, i) =>
                      studentInfo.courseDuration === item.course_duration && (
                        <SelectItem
                          key={i}
                          value={`${range.from} to ${range.to} ${current_year}`}
                        >{`${range.from} ${
                          item.addYear > 0 ? current_year : ""
                        } to ${range.to} ${
                          current_year + item.addYear
                        }`}</SelectItem>
                      )
                  )
                )}
            </SelectContent>
          </Select>
          <Select
            value={studentInfo.mediam}
            onValueChange={(value) => setStudentInfo({ mediam: value })}
          >
            <SelectTrigger className="w-full branch_input">
              <SelectValue placeholder="Select Medium" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bangla">Bangla</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default CourseInfo;
