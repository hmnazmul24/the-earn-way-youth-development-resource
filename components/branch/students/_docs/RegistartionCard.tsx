"use client";

import { ReactNode, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { BranchStudentType } from "@/types/students";
import Image from "next/image";
import { generateRegistrationCardPDF } from "@/components/data/pdf-func";

const SelectedStudent = ({
  id,
  info,
}: {
  id: string;
  info: BranchStudentType[];
}): BranchStudentType => {
  let filterStudent = info.filter((item) => item.id === id);
  return filterStudent[0];
};

export default function RegistrationCard({
  info,
  id,
  branchName,
}: {
  info: BranchStudentType[];
  id: string;
  branchName: string;
}) {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const {
    name,
    fatherName,
    motherName,
    dateOfBirth,
    gender,
    courseTrade,
    genRoll,
    genReg,
    courseRange,
    profileDoc,
  } = SelectedStudent({ id, info });

  const handleDownload = async () => {
    generateRegistrationCardPDF(SelectedStudent({ id, info }), branchName);
    // if (componentRef.current) {
    //   const canvas = await html2canvas(componentRef.current, {
    //     scale: 2, // Increase for higher resolution
    //     useCORS: true,
    //     backgroundColor: "white", // White background for the canvas
    //   });

    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF("p", "px", "a4");

    //   // Calculate width and height to fit into the PDF
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    //   pdf.save("article.pdf");
    // }
  };

  return (
    <>
      <div
        className="cursor-pointer inline m-auto my-4 text-blue-500 underline"
        onClick={handleDownload}
      >
        click to download
      </div>
      <div>
        <div
          ref={componentRef}
          className="p-2 relative box-border m-auto w-[48rem] aspect-[11.6/16] text-center "
        >
          <Image
            src={"/reg2.jpeg"}
            height={1200}
            width={1000}
            alt="registration"
            className="w-full -translate-y-[6px] z-20"
          />
          <div className="font-bold z-50 left-0 w-full flex items-center justify-center absolute top-[420px] text-[2.1rem] ">
            {courseTrade}
          </div>
          <div className="h-[400px] z-30 absolute right-0 bottom-[205px] w-[450px] ">
            <ul className="flex mt-3 gap-1 items-start font-bold font-salsa justify-start flex-col">
              <li>{name}</li>
              <li>{fatherName}</li>
              <li className="mt-1">{motherName}</li>
              <li className="mt-[2px]">{gender}</li>
              <li className="mt-3">{dateOfBirth}</li>
              <li>{branchName}</li>
              <li className="mt-2">{genReg}</li>
            </ul>
            <Image
              src={`${profileDoc?.secure_url}`}
              height={100}
              width={100}
              alt="registration"
              className="absolute  w-32 top-0 right-16"
            />
            <div className="absolute -left-1 text-[1rem] font-salsa bottom-[75px] font-bold">
              {genRoll}
            </div>
            <div className="absolute left-[190px] text-[1.2rem] bottom-[40px] flex flex-col justify-start items-start font-bold">
              <div className="text-sm mb-1">{courseRange}</div>
              <div className="ml-7 italic">2024</div>
            </div>
          </div>
          <div className="h-5 w-5 bg-white absolute left-[167px] bottom-[288px]"></div>
        </div>
      </div>
    </>
  );
}
