// File: /components/PersonalInfo.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { bloodGroups } from "@/components/data/array_info";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SingleDatePicker from "./DatePicker";
import useStudentStore from "@/hooks/useStudentStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RxCross1 } from "react-icons/rx";

const AvatarEdit = dynamic(() => import("./AvaterEdit"), { ssr: false });

const PersonalInfo = () => {
  const { studentInfo, setStudentInfo, existImgUrl, setExistImgUrl } =
    useStudentStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStudentInfo({ [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-white p-4 rounded-sm mb-3">
      <h1 className="branch_heading">Personal Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_0.7fr] gap-4 md:gap-16">
        <div className="flex items-center flex-col gap-3">
          <Input
            type="text"
            placeholder="Name"
            className="branch_input"
            name="name"
            value={studentInfo.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Father's Name"
            className="branch_input"
            name="fatherName"
            value={studentInfo.fatherName}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Mother's Name"
            className="branch_input"
            name="motherName"
            value={studentInfo.motherName}
            onChange={handleChange}
          />
          <Input
            type="number"
            placeholder="Mobile"
            className="branch_input"
            name="mobile"
            value={studentInfo.mobile}
            onChange={handleChange}
          />
          <SingleDatePicker />
        </div>
        <div className="flex items-center flex-col gap-3">
          <Select
            value={studentInfo.religion}
            onValueChange={(value) => setStudentInfo({ religion: value })}
          >
            <SelectTrigger className="w-full branch_input">
              <SelectValue placeholder="Select Religion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Islam">Islam</SelectItem>
              <SelectItem value="Hinduism">Hinduism</SelectItem>
              <SelectItem value="Christianity">Christianity</SelectItem>
              <SelectItem value="Buddhism">Buddhism</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={studentInfo.nationality}
            onValueChange={(value) => setStudentInfo({ nationality: value })}
          >
            <SelectTrigger className="w-full branch_input">
              <SelectValue placeholder="Nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bangladeshi">Bangladeshi</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={studentInfo.bloodGroup}
            onValueChange={(value) => setStudentInfo({ bloodGroup: value })}
          >
            <SelectTrigger className="w-full branch_input">
              <SelectValue placeholder="Select Blood Group" />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={studentInfo.gender}
            onValueChange={(value) => setStudentInfo({ gender: value })}
          >
            <SelectTrigger className="w-full branch_input">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              {["male", "female"].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="email"
            placeholder="Email (optional)"
            className="branch_input"
            name="email"
            value={studentInfo.email ?? ""}
            onChange={handleChange}
          />
        </div>
        {existImgUrl === "" ? (
          <div>
            <AvatarEdit />
          </div>
        ) : (
          <div className="relative inline">
            <Image
              src={existImgUrl}
              className="border relative rounded-md border-gray-800"
              height={200}
              width={200}
              alt="Preview"
            />
            {/* <span
              className="absolute rounded-full cursor-pointer -top-1 -left-1 bg-red-500 hover:bg-red-600"
              onClick={() => setExistImgUrl("")}
            >
              <RxCross1 className="m-2 text-sm text-white" />
            </span> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonalInfo;
