"use client";
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
import Certificate from "./Certificate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCertificateInfo } from "@/actions/studentsForAdmin/giveResult";

const RegistrationCardModal = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const { data, isPending, mutate } = useMutation({
    mutationFn: getCertificateInfo,
  });
  const hanldeClick = () => {
    mutate(id);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger
          onClick={hanldeClick}
          className="text-white bg-blue-500 p-1 px-3 rounded-md"
        >
          {children}
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent className="md:max-w-[80vw] border-black  bg-sky-900">
          <div className="max-h-[80vh] w-full scrollbar_hidden  overflow-y-scroll">
            {data && <Certificate info={data?.info!} isPending={isPending} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrationCardModal;
