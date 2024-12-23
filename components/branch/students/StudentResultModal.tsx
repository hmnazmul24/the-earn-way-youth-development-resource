import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResultBox from "./_docs/ResultBox";
import { StudentPaidType } from "@/components/data/tableHelper";

const StudentResultModal = ({
  children,
  info,
}: {
  children: React.ReactNode;
  info: StudentPaidType[];
}) => {
  const dummyData = Array.from({ length: 3 }, (_, i) => ({
    id: `id-${i + 1}`,
    name: `Student ${i + 1}`,
    genRoll: `Roll-${i + 1}`,
    genReg: `Reg-${i + 1}`,
    mobile: `987654321${i}`,
    trade: i % 2 === 0 ? "Engineering" : "Computer Science",
    range: i % 2 === 0 ? "Jan to Mar 2024" : "Jul to Sep 2024",
    duration: i % 2 === 0 ? "3 months" : "6 months",
    createdAt: new Date(),
    isPaid: i % 2 === 0,
    result: i % 2 === 0 ? "Pass" : "Fail",
    branchName: `Branch ${(i % 3) + 1}`,
    picture: "/pdf.jpg",
    studentInfo: [],
  }));

  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="w-[54rem] max-w-full max-h-[90vh] overflow-y-scroll">
          <DialogHeader className="w-full">
            <DialogTitle></DialogTitle>
            <DialogDescription className="w-full">
              <ResultBox info={info} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentResultModal;
