"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { BranchStudentType } from "@/types/students";
import Image from "next/image";

const AdmissionForm: React.FC<{ student: BranchStudentType }> = ({
  student,
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = async () => {
    if (componentRef.current) {
      const canvas = await html2canvas(componentRef.current, {
        scale: 2, // Increase for higher resolution
        useCORS: true,
        backgroundColor: "white", // White background for the canvas
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");

      // Calculate width and height to fit into the PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("article.pdf");
    }
  };
  return (
    <div>
      <div
        ref={componentRef}
        className="w-[210mm] min-h-[297mm] bg-white mx-auto   border  text-sm border-gray-500/40 shadow-md"
      >
        <header className="text-center mb-2 pb-3 pt-4 bg-sky-900/20 border border-gray-400/40">
          <div className="flex items-center justify-center my-3">
            <Image
              height={60}
              width={60}
              alt="main-logo"
              src="/logo.png"
              className="w-12"
            ></Image>
          </div>
          <h1 className="text-xl font-bold ">Admission Form</h1>
          <p className="text-sm text-gray-600">
            The Earn Way Youth Development Resource
          </p>
          <p className="text-sm text-gray-600">
            Sohidul Islam Market,Damurhuda, Chuadanga
          </p>
        </header>

        <div className="p-8">
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Name:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.name}
                </p>
              </div>
              <div>
                <p className="font-medium">Father&apos;s Name:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.fatherName}
                </p>
              </div>
              <div>
                <p className="font-medium">Mother&apos;s Name:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.motherName}
                </p>
              </div>
              <div>
                <p className="font-medium">Mobile:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.mobile}
                </p>
              </div>
              <div>
                <p className="font-medium">Gender:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.gender}
                </p>
              </div>
              <div>
                <p className="font-medium">Date of Birth:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {new Date(student.dateOfBirth).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="font-medium">Nationality:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.nationality}
                </p>
              </div>
              <div>
                <p className="font-medium">Religion:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.religion}
                </p>
              </div>
              <div>
                <p className="font-medium">Blood Group:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.bloodGroup}
                </p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.email ? (
                    student.email
                  ) : (
                    <div className="invisible">email@gmail.com</div>
                  )}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Course Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Course Duration:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.courseDuration}
                </p>
              </div>
              <div>
                <p className="font-medium">Course Range:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.courseRange}
                </p>
              </div>
              <div>
                <p className="font-medium">Course Trade:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.courseTrade}
                </p>
              </div>
              <div>
                <p className="font-medium">Medium:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.mediam}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Academic Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Passed Board:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.passedBoard}
                </p>
              </div>
              <div>
                <p className="font-medium">Passed Year:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.passedYear}
                </p>
              </div>
              <div>
                <p className="font-medium">Passed Roll:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.passedYear}
                </p>
              </div>
              <div>
                <p className="font-medium">Passed Result:</p>
                <p className="border border-gray-300 p-2 rounded">
                  {student.passedResult}
                </p>
              </div>
            </div>
          </section>
          <section className="mt-12 flex items-center justify-between">
            <div className=" inline-block border-b border-gray-500">
              <span className=" translate-y-6 inline-block">
                Student&apos;s Signature
              </span>
            </div>
            <div className=" inline-block border-b border-gray-500">
              <span className="translate-y-6 inline-block">
                Authority&apos;s Signature
              </span>
            </div>
          </section>
        </div>
      </div>
      <div className="flex items-center justify-center my-10">
        <Button onClick={() => handleDownload()}>Download</Button>
      </div>
    </div>
  );
};

export default AdmissionForm;
