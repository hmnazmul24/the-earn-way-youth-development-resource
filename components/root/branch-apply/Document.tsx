import React, { useRef, useState } from "react";
import useBranchStore from "@/hooks/useBranchStore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { customToast } from "@/components/shared/ToastContainer";

const DocumentsForm: React.FC = () => {
  const { documents, setDocuments } = useBranchStore();
  const passportRef = useRef<HTMLInputElement | null>(null);
  const nationalIdRef = useRef<HTMLInputElement | null>(null);
  const tradeLicenceRef = useRef<HTMLInputElement | null>(null);
  const signatureRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files![0].size > 1 * 1024 * 1024) {
      return customToast("error", "file size must be less than 1 MB");
    }
    if (files && files.length > 0) {
      setDocuments({ [name]: files[0] });
    }
  };

  const handleSelected = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const getFilePreview = (file: File) => {
    if (file.type.includes("pdf")) {
      return "/pdf.jpg";
    }
    return URL.createObjectURL(file);
  };

  const renderPreview = (file: File, fieldName: string) => (
    <div className="relative border border-red-500 rounded-md overflow-hidden">
      <Image
        src={getFilePreview(file)}
        height={200}
        width={200}
        alt={`${fieldName} preview`}
      />
      <Button
        className="absolute top-0 right-0"
        variant="destructive"
        onClick={() => setDocuments({ [fieldName]: null })}
      >
        Remove
      </Button>
    </div>
  );

  return (
    <div className="bg-slate-50 p-6 rounded-none shadow-md">
      <h2 className="text-2xl font-bold mb-4">Documents</h2>
      <div className="space-y-4">
        <div className="border border-dashed p-6 rounded-md text-center">
          <p>Passport Size Photo (JPG, PNG)</p>
          <input
            ref={passportRef}
            className="mt-4 hidden"
            type="file"
            name="ppSizePhoto"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
          <div className="w-full flex items-center justify-center my-2">
            {documents.ppSizePhoto ? (
              renderPreview(documents.ppSizePhoto, "ppSizePhoto")
            ) : (
              <Button onClick={() => handleSelected(passportRef)}>Add</Button>
            )}
          </div>
        </div>
        <div className="border border-dashed p-6 rounded-md text-center">
          <p>National ID Card (JPG, PNG, PDF)</p>
          <input
            ref={nationalIdRef}
            className="mt-4 hidden"
            type="file"
            name="nationalIDCard"
            accept="image/jpeg, image/png, application/pdf"
            onChange={handleFileChange}
          />
          <div className="w-full flex items-center justify-center my-2">
            {documents.nationalIDCard ? (
              renderPreview(documents.nationalIDCard, "nationalIDCard")
            ) : (
              <Button onClick={() => handleSelected(nationalIdRef)}>Add</Button>
            )}
          </div>
        </div>
        <div className="border border-dashed p-6 rounded-md text-center">
          <p>Trade License (JPG, PNG, PDF)</p>
          <input
            ref={tradeLicenceRef}
            className="mt-4 hidden"
            type="file"
            name="tradeLicense"
            accept="image/jpeg, image/png,application/pdf"
            onChange={handleFileChange}
          />
          <div className="w-full flex items-center justify-center my-2">
            {documents.tradeLicense ? (
              renderPreview(documents.tradeLicense, "tradeLicense")
            ) : (
              <Button onClick={() => handleSelected(tradeLicenceRef)}>
                Add
              </Button>
            )}
          </div>
        </div>
        <div className="border border-dashed p-6 rounded-md text-center">
          <p>Signature (Must be 300px/300px and png)</p>
          <input
            ref={signatureRef}
            className="mt-4 hidden"
            type="file"
            name="signature"
            accept="image/png"
            onChange={handleFileChange}
          />
          <div className="w-full flex items-center justify-center my-2">
            {documents.signature ? (
              renderPreview(documents.signature, "signature")
            ) : (
              <Button onClick={() => handleSelected(signatureRef)}>Add</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsForm;
