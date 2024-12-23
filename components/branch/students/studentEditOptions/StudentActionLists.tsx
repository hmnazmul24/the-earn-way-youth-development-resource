"use client";

import React, { ReactNode, useEffect, useRef } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DeleteStudent from "../DeleteStudent";
import DetailStudentInfo from "./DetailStudentInfo";
import StudentPaymentRecords from "./StudentPaymentRecords";
import { BranchStudentType } from "@/types/students";
import AdmissionFormModal from "../_docs/AdmissionFormModal";
import { Download } from "lucide-react";
import { generateAdmissionFormPDF } from "@/components/data/pdf-func";

const StudentActionLists = ({
  children,
  students,
  studentId,
  imgUrl,
  publicId,
}: {
  students: BranchStudentType[] | null;
  imgUrl: string;
  publicId?: string;
  studentId: string;
  children: ReactNode;
}) => {
  const deleteRef = useRef<HTMLDivElement | null>(null);
  const detailInfoRef = useRef<HTMLDivElement | null>(null);
  const paymentRef = useRef<HTMLDivElement | null>(null);
  const addmissionFormRef = useRef<HTMLDivElement | null>(null);

  if (!students) {
    return null;
  }
  // getdata

  const studentInfo: BranchStudentType = students.filter(
    (item) => item.id === studentId
  )[0];

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-0">{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="bottom"
          className=" p-4 *:cursor-pointer"
        >
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              detailInfoRef.current?.click();
            }}
          >
            Detail Info
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              paymentRef.current?.click();
            }}
          >
            Add Payment Record
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer "
            onClick={() => {
              generateAdmissionFormPDF(studentInfo);
            }}
          >
            admission form <Download className="w-4 text-green-500 ml-2" />
          </DropdownMenuItem>
          {publicId && (
            <>
              <Link
                className="cursor-pointer"
                href={`/branch/unpaid-students/${studentId}`}
              >
                <DropdownMenuItem className="cursor-pointer">
                  Edit
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                className="text-red-500 cursor-pointer "
                onClick={(e) => {
                  deleteRef.current?.click();
                }}
              >
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {publicId && (
        <DeleteStudent id={studentId} public_id={publicId}>
          <div ref={deleteRef} className="hidden"></div>
        </DeleteStudent>
      )}
      <DetailStudentInfo student={studentInfo} imgUrl={imgUrl}>
        <div ref={detailInfoRef} className="hidden"></div>
      </DetailStudentInfo>
      <StudentPaymentRecords student={studentInfo} imgUrl={imgUrl}>
        <div ref={paymentRef} className="hidden"></div>
      </StudentPaymentRecords>
      {/* <AdmissionFormModal branchStudent={studentInfo}>
        <div ref={addmissionFormRef} className="hidden"></div>
      </AdmissionFormModal> */}
    </div>
  );
};

export default StudentActionLists;
