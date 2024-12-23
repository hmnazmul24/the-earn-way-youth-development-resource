"use client";

import { AllCourses } from "@/components/data";
import CourseCard from "@/components/root/CourseCard";
import React from "react";

const CoursePage = () => {
  return (
    <div className="min-h-screen mb-10 w-full text-center  md:container">
      <h1 className="text-center my-7 text-2xl md:text-3xl text-transparent inline-block bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-clip-text font-bold">
        All Courses
      </h1>
      <div className="flex w-full px-4 flex-wrap items-center lg:items-start md:gap-4 justify-start">
        {AllCourses.map((item, i) => (
          <CourseCard
            code={item.code}
            name={item.name}
            url={item.url}
            key={item.name}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
