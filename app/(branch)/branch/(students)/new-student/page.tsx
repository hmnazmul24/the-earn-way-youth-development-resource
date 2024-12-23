"use client";
import { createStudentAction } from "@/actions/student";
import AcadamicInfo from "@/components/branch/students/AcadamicInfo";
import CourseInfo from "@/components/branch/students/CourseInfo";
import PersonalInfo from "@/components/branch/students/PersonalInfo";
import { extractErrors, getBase64String } from "@/components/data/helpers";
import { customToast } from "@/components/shared/ToastContainer";
import { Button } from "@/components/ui/button";
import useStudentStore from "@/hooks/useStudentStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AddnewPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { studentInfo, profileUrl, resetForm } = useStudentStore();
  const { mutate, isPending } = useMutation({
    mutationFn: createStudentAction,
    onSuccess: ({ error, message }) => {
      if (error) {
        if (typeof error === "string") {
          return customToast("error", error);
        } else {
          return customToast("error", extractErrors(error).join(","));
        }
      }
      if (message) customToast("success", message);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["allStudentsOfBranch"] });
      router.push("/branch/unpaid-students");
    },
  });
  const handleSubmit = async () => {
    if (profileUrl) {
      const formData = new FormData();
      if (profileUrl.size > 1 * 2024 * 2024) {
        return customToast("error", "file size must be less that 1 MB");
      }
      let stringFile = await getBase64String(profileUrl as File);
      formData.append("studentInfo", JSON.stringify(studentInfo));
      formData.append("profileUrl", stringFile);
      mutate(formData);
    }
  };
  useEffect(() => {
    resetForm();
  }, [resetForm]);
  return (
    <div>
      <PersonalInfo />
      <CourseInfo />
      <AcadamicInfo />
      <div className="flex items-center justify-end my-5">
        <Button
          className=" m-4 md:m-0 p-6 md:p-8 px-8 md:px-10 text-lg rounded-sm "
          onClick={handleSubmit}
          disabled={isPending}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddnewPage;
