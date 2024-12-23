// pages/index.tsx
"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import BranchInfoForm from "@/components/root/branch-apply/BranchInfo";
import MoreInfoForm from "@/components/root/branch-apply/MoreInfo";
import DocumentsForm from "@/components/root/branch-apply/Document";
import PersonalInfoForm from "@/components/root/branch-apply/PersonalInfo";
import { CreateBranchAction } from "@/actions/branch";
import { customToast } from "@/components/shared/ToastContainer";
import { extractErrors, getBase64String } from "@/components/data/helpers";
import { useMutation } from "@tanstack/react-query";
import SuccessMessage from "@/components/root/branch-apply/SuccessMessage";
import { useRouter } from "next/navigation";
import useBranchStore from "@/hooks/useBranchStore";
import { motion } from "framer-motion";

const BranchApply: React.FC = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { branchInfo, documents, moreInfo, personalInfo, resetForm } =
    useBranchStore();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateBranchAction,
    onSuccess: ({ error, message }) => {
      if (error) {
        if (typeof error === "string") {
          return customToast("error", error);
        } else {
          return customToast("error", extractErrors(error).join(","));
        }
      }
      if (message) setShowSuccess(true);
    },
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("branchInfo", JSON.stringify(branchInfo));
    formData.append("personalInfo", JSON.stringify(personalInfo));
    formData.append("moreInfo", JSON.stringify(moreInfo));
    let doucmentUrl = await getBase64String(
      documents.ppSizePhoto as File | null
    );
    let tradeUrl = await getBase64String(documents.tradeLicense as File | null);
    let NIDUrl = await getBase64String(documents.nationalIDCard as File | null);
    let signatureUrl = await getBase64String(
      documents.signature as File | null
    );
    formData.append("ppSizePhoto", doucmentUrl);
    formData.append("tradeLicense", tradeUrl);
    formData.append("nationalIDCard", NIDUrl);
    formData.append("signature", signatureUrl);
    mutate(formData);
  };

  const clearAllField = () => {
    resetForm();
    setShowSuccess(false);
  };
  return (
    <div className="md:container z-30 py-10">
      {showSuccess && <SuccessMessage clear={clearAllField} />}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -100, opacity: 0 }}
          >
            <BranchInfoForm />
          </motion.div>
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 100, opacity: 0 }}
          >
            <PersonalInfoForm />
          </motion.div>
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -100, opacity: 0 }}
          >
            <MoreInfoForm />
          </motion.div>
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
          >
            <DocumentsForm />
          </motion.div>
        </div>
        <div className="flex rounded-sm justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-10 mx-3 md:mx-0 shadow-md text-xl py-6 md:py-8 transition-all bg-yellow-500 rounded-none border border-gray-400 text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            {isPending ? "Submitting" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BranchApply;
