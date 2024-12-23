import React from "react";
import CourseCard from "./CourseCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { AllCourses } from "../data";

const PopularCourse = () => {
  return (
    <div className="min-h-screen md:py-16 p-3 px-6 md:p-0 text-center">
      <h1 className="my-8 text-2xl gap-3 md:text-3xl font-bold text-amber-500 underline">
        Popular Courses{" "}
        <Link href={"/all-courses"}>
          <Button className="rounded-none mx-3">view all</Button>
        </Link>
      </h1>
      <div className="flex w-full flex-wrap items-center justify-between">
        {AllCourses.slice(0, 8).map((item, i) => (
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

export default PopularCourse;
