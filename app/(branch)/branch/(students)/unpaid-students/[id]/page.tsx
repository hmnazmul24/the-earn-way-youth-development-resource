"use client";
import {
  createStudentAction,
  GetSingleStudentById,
  updateStudentAction,
} from "@/actions/student";
import AcadamicInfo from "@/components/branch/students/AcadamicInfo";
import CourseInfo from "@/components/branch/students/CourseInfo";
import PersonalInfo from "@/components/branch/students/PersonalInfo";
import { extractErrors } from "@/components/data/helpers";
import { customToast } from "@/components/shared/ToastContainer";
import { Button } from "@/components/ui/button";
import useStudentStore from "@/hooks/useStudentStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaAngleLeft } from "react-icons/fa6";

const EditStudentData = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { studentInfo, setStudentInfo, setExistImgUrl } = useStudentStore();
  let { id: studentId } = useParams<{ id: string }>();

  //query
  let {} = useQuery({
    queryKey: ["singleStudent"],
    queryFn: async () => {
      let info = await GetSingleStudentById(studentId!);
      if (info?.student) {
        let {
          name,
          fatherName,
          motherName,
          bloodGroup,
          mobile,
          religion,
          courseDuration,
          courseRange,
          courseTrade,
          dateOfBirth,
          email,
          mediam,
          nationality,
          passedBoard,
          passedResult,
          passedRoll,
          passedType,
          gender,
          passedYear,
          profileDoc,
        } = info.student;
        setStudentInfo({
          name,
          fatherName,
          motherName,
          bloodGroup,
          mobile,
          religion,
          courseDuration,
          courseRange,
          courseTrade,
          dateOfBirth,
          email: email || "",
          mediam,
          nationality,
          passedBoard,
          passedResult,
          passedRoll,
          passedType,
          gender,
          passedYear,
        });
        if (profileDoc) {
          setExistImgUrl(profileDoc.secure_url);
        }
      }
      return info;
    },
  });

  //query
  const { mutate, isPending } = useMutation({
    mutationFn: updateStudentAction,
    onSuccess: ({ error, message }) => {
      if (error) {
        if (typeof error === "string") {
          return customToast("error", error);
        } else {
          return customToast("error", extractErrors(error).join(","));
        }
      }
      if (message) customToast("success", message);
      queryClient.invalidateQueries({
        queryKey: ["allStudentsOfBranch", "singleStudent"],
      });
    },
  });
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("studentInfo", JSON.stringify(studentInfo));
    mutate({ formData, id: studentId });
  };
  return (
    <div>
      <Link href={"/branch/unpaid-students"}>
        {" "}
        <div className="my-3 text-blue-500 flex items-center gap-4">
          <FaAngleLeft /> back to list
        </div>
      </Link>
      <PersonalInfo />
      <CourseInfo />
      <AcadamicInfo />
      <div className="flex items-center justify-end my-5">
        <Button
          className=" p-6 md:p-8 px-8 md:px-10 text-lg rounded-sm "
          onClick={handleSubmit}
          disabled={isPending}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditStudentData;
