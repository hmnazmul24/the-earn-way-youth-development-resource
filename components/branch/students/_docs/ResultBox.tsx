import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { StudentPaidType } from "@/components/data/tableHelper";
import Image from "next/image";

const ResultBox = ({ info }: { info: StudentPaidType[] }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = async () => {
    if (componentRef.current) {
      const component = componentRef.current;

      const canvas = await html2canvas(component, {
        scale: 2, // Higher scale for better resolution
        useCORS: true,
        backgroundColor: "white", // Ensure white background
      });

      const pdf = new jsPDF("p", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgData = canvas.toDataURL("image/png");
      const imgHeight = (canvas.height * pdfWidth) / canvas.width; // Calculate proportional image height

      // Logic for multi-page PDF
      let yOffset = 0;
      while (yOffset < imgHeight) {
        pdf.addImage(imgData, "PNG", 0, -yOffset, pdfWidth, imgHeight);
        yOffset += pdfHeight; // Move down by one page height
        if (yOffset < imgHeight) {
          pdf.addPage(); // Add a new page if there's more content
        }
      }

      pdf.save("students-result-sheet.pdf");
    }
  };

  return (
    <div className="relative m-auto w-full text-center overflow-x-auto">
      <div
        ref={componentRef}
        className="p-4 border rounded shadow-md bg-white w-[48rem] mx-auto"
      >
        <div>
          <Image src={"/logo.png"} height={70} width={70} alt="main-logo" />
          <h1 className="font-semibold text-base ">
            The Earn Way Youth Development Resource
          </h1>
          <h2 className=" my-1">Student Result Sheet</h2>
        </div>
        {info.map((student) => (
          <ul
            key={student.id}
            className="mb-2 grid grid-cols-6 place-items-center border border-gray-300 even:bg-gray-100"
          >
            <li className="place-self-start">
              <Image
                src={student.picture!}
                height={70}
                width={70}
                alt="student-picture "
                className="border"
              />
            </li>
            <li>{student.name}</li>
            <li>{student.genRoll}</li>
            <li>{student.trade}</li>
            <li>{student.range}</li>
            <li>{student.result}</li>
          </ul>
        ))}
      </div>
      <Button onClick={handleDownload} className="mt-4">
        Download PDF
      </Button>
    </div>
  );
};

export default ResultBox;
