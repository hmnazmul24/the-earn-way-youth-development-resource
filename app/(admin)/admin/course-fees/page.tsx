"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { courseNameArr } from "@/components/data/array_info";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCourseFees, UpdateCourseFees } from "@/actions/courseFees";
import { customToast } from "@/components/shared/ToastContainer";
import { CourseFeesType } from "@/types";

let existData = async () => {
  let data = await getAllCourseFees();
  return data;
};
const CourseFeesPage = () => {
  const [fees, setFees] = useState<CourseFeesType>({
    name: "",
    threeMonths: "",
    sixMonths: "",
    oneYear: "",
    twoYears: "",
    threeYears: "",
    fourYears: "",
  });
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["fees"],
    queryFn: existData,
  });
  const { mutate, isPending: updatePending } = useMutation({
    mutationFn: UpdateCourseFees,
    onSuccess: ({ error, message }) => {
      if (error) return customToast("error", error);
      if (message) customToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["fees"] });
    },
  });

  const handleSubmit = () => {
    if (fees.name === "") {
      customToast("error", "please select a course");
    } else {
      mutate(fees);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setFees({
      ...fees,
      [key]: e.target.value,
    });
  };

  if (isPending) {
    return <div>loading...</div>;
  }
  if (data?.error) {
    return <div className="text-red-500"> error occurs...</div>;
  }

  const hanldeChangle = (value: string) => {
    setFees({ ...fees, name: value });
    if (data !== undefined && data.feesData) {
      let filteredData = data?.feesData.filter((item) => item.name === value);
      if (filteredData?.length > 0) {
        setFees({
          ...fees,
          name: value,
          oneYear: filteredData[0].oneYear,
          twoYears: filteredData[0].twoYears,
          threeMonths: filteredData[0].threeMonths,
          sixMonths: filteredData[0].sixMonths,
          threeYears: filteredData[0].threeYears,
          fourYears: filteredData[0].fourYears,
        });
      } else {
        setFees({
          ...fees,
          name: value,
          oneYear: "",
          twoYears: "",
          threeMonths: "",
          sixMonths: "",
          threeYears: "",
          fourYears: "",
        });
      }
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="grid grid-cols-[1fr_0.5fr] p-4 bg-white rounded shadow-md">
        <ul className="flex flex-col gap-3">
          <li>
            <Select onValueChange={hanldeChangle}>
              <SelectTrigger className="w-2/3 p-5">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courseNameArr.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </li>
          <li>3 Months Course</li>
          <li>6 Months Course</li>
          <li>1 Year Course</li>
          <li>2 Years Course</li>
          <li>3 Years Course</li>
          <li>4 Years Course</li>
        </ul>
        <ul className="flex flex-col gap-1">
          <li>
            <Button
              disabled={updatePending}
              className="w-full py-5"
              onClick={handleSubmit}
            >
              Confirm Fees
            </Button>
          </li>
          <li>
            <Input
              type="number"
              placeholder="price (taka)"
              value={fees.threeMonths}
              onChange={(e) => handleInputChange(e, "threeMonths")}
            />
          </li>
          <li>
            <Input
              type="number"
              placeholder="price (taka)"
              value={fees.sixMonths}
              onChange={(e) => handleInputChange(e, "sixMonths")}
            />
          </li>
          <li>
            <Input
              type="number"
              placeholder="price (taka)"
              value={fees.oneYear}
              onChange={(e) => handleInputChange(e, "oneYear")}
            />
          </li>
          <li>
            <Input
              type="number"
              placeholder="price (taka)"
              value={fees.twoYears}
              onChange={(e) => handleInputChange(e, "twoYears")}
            />
          </li>
          <li>
            <Input
              type="number"
              placeholder="price (taka)"
              value={fees.threeYears}
              onChange={(e) => handleInputChange(e, "threeYears")}
            />
          </li>
          <li>
            <Input
              type="number"
              placeholder="price (taka)"
              value={fees.fourYears}
              onChange={(e) => handleInputChange(e, "fourYears")}
            />
          </li>
        </ul>
      </div>
      {/* <CourseFeeCard /> */}
    </div>
  );
};

export default CourseFeesPage;
