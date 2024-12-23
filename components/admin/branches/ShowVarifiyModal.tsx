"use client";

import { updateVarifyAction } from "@/actions/branch";
import { customToast } from "@/components/shared/ToastContainer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const ShowVarifiyModal = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, data } = useMutation({
    mutationFn: updateVarifyAction,
    onSuccess: ({ error, message }) => {
      if (error) {
        return customToast("error", error);
      }
      if (message) {
        customToast("success", message);
      }
      queryClient.invalidateQueries({ queryKey: ["branch"] });
    },
  });

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-none">
        <DialogTitle>Branch Permission</DialogTitle>
        <div>
          <p>Are you sure you want to verify this branch?</p>
          <div className="flex items-center justify-center my-3">
            <Button
              disabled={isPending}
              className="bg-green-500 hover:bg-green-600"
              onClick={() => mutate(id)}
            >
              {!isPending
                ? !data?.message
                  ? "Accept"
                  : "Accepted"
                : "Accepting..."}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowVarifiyModal;
