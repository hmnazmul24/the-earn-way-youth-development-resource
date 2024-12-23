import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdmissionForm from "./AdmissionForm";
import { BranchStudentType } from "@/types/students";
const AdmissionFormModal = ({
  children,
  branchStudent,
}: {
  children: React.ReactNode;
  branchStudent: BranchStudentType;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-full h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <AdmissionForm student={branchStudent} />
        <DialogFooter className="mt-20 text-center">
          <p className="text-sm text-gray-600">
            This document is auto-generated and does not require a signature.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdmissionFormModal;
