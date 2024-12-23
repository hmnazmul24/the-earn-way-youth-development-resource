"use client";

import { Fragment, ReactNode, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { BranchStudentType } from "@/types/students";
import Image from "next/image";
import { CertificateInfoType } from "@/types";
import { generateCertificatePdf } from "@/components/data/pdf-func";

const textShorter = (text: string, count: number): string => {
  if (text.length > count) {
    return `${text.slice(0, count)}...`;
  }
  return text;
};

export default function Certificate({
  info,
  isPending,
}: {
  info: CertificateInfoType;
  isPending: boolean;
}) {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = async () => {
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

    if (componentRef.current) {
      generateCertificatePdf(info);
    }
  };

  return (
    <Fragment>
      {!isPending && (
        <div
          className="cursor-pointer mt-6 inline m-auto my-4 rounded-md p-2 text-amber-500 underline"
          onClick={handleDownload}
        >
          download certificate
        </div>
      )}
      {isPending ? (
        <div className="min-h-screen text-white text-center">
          Generating Certificate...
        </div>
      ) : (
        <div>
          <div
            ref={componentRef}
            className="p-2 relative box-border m-auto w-[62rem] aspect-[11.6/16] text-center "
          >
            <Image
              src={"/certificate.jpeg"}
              height={2200}
              width={2000}
              alt="registration"
              className="w-full -translate-y-[6px] z-20"
            />
            <div className=" h-[300px] font-bold w-full z-40 absolute left-0 top-[220px]">
              <div className="flex items-center justify-end">
                <ul className="w-[30%] h-[120px] pl-24 pt-[42px] flex items-start justify-start flex-col gap-0 ">
                  <li>{info.roll}</li>
                  <li>{info.reg}</li>
                  <li className="text-sm">{info.issueDate}</li>
                </ul>
              </div>
              <div className="flex items-center justify-end relative">
                <ul className="w-[62%] flex items-start justify-start pt-1 gap-1 flex-col h-[170px] ">
                  <li className="ml-16">{info.fullName}</li>
                  <li className="flex ml-8 mt-1 items-center gap-48 justify-start">
                    <span>{info.fathersName}</span>
                    <span></span>
                  </li>{" "}
                  <li className="ml-48">{info.courseName} </li>
                  <li className="flex items-center gap-52 justify-start">
                    <span className="ml-16 text-sm mt-1 ">
                      {textShorter(info.branchName, 32)}
                    </span>
                    <span className="ml-2"></span>
                  </li>
                  <li className="flex items-center gap-72 justify-start">
                    <span className="ml-2">{info.held}</span>
                    <span></span>
                  </li>
                  <div className="flex items-start pt-10 justify-start flex-col gap-2 absolute top-0 left-[710px]">
                    <span>{info.mothersName}</span>
                    <span className="mt-7 ml-36">{info.branchCode}</span>
                    <span className="ml-36 -translate-y-1">{info.grade}</span>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
