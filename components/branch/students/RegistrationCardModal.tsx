import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BranchStudentType } from "@/types/students";
import RegistrationCard from "./_docs/RegistartionCard";

const RegistrationCardModal = ({
  children,
  info,
  id,
  branchName,
}: {
  children: ReactNode;
  info: BranchStudentType[];
  id: string;
  branchName: string;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="md:max-w-[80vw] border-black  bg-zinc-900">
          <div className="max-h-[80vh] w-full scrollbar_hidden  overflow-y-scroll">
            <RegistrationCard id={id} info={info} branchName={branchName} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrationCardModal;
