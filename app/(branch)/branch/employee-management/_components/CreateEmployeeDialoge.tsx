"use client";

import React, { ReactNode, useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmployeeForm from "./EmployeeCreate";
const CreateEmployeeDialouge = ({ children }: { children: ReactNode }) => {
  const dialougeRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = () => {
    if (dialougeRef.current) {
      dialougeRef.current.click();
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-black rounded-md text-base w-full text-white">
          {children}
        </DialogTrigger>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-h-[90vh] w-full lg:max-w-lg overflow-y-auto"
        >
          <EmployeeForm closeModal={closeModal} />
        </DialogContent>
        <DialogClose ref={dialougeRef} />
      </Dialog>
    </div>
  );
};

export default CreateEmployeeDialouge;
