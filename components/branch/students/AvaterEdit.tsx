"use client";

import useStudentStore from "@/hooks/useStudentStore";
import Image from "next/image";
import React, { useRef } from "react";
import Avatar from "react-avatar-edit";

const AvatarEdit = () => {
  const { profileUrl, setPorfileUrl } = useStudentStore();
  const avatarRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    setPorfileUrl(null);
  };

  const onCrop = (preview: any) => {
    fetch(preview)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "cropped-image.png", {
          type: "image/png",
        });
        setPorfileUrl(file);
      });
  };

  const onBeforeFileLoad = (elem: React.ChangeEvent<HTMLInputElement>) => {
    if (elem.target.files && elem.target.files[0].size > 716800) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  const handleDivClick = () => {
    if (avatarRef.current) {
      // Trigger the file input within react-avatar-edit
      const fileInput = avatarRef.current.querySelector("input[type='file']");
      if (fileInput) {
        (fileInput as HTMLInputElement).click();
      }
    }
  };

  return (
    <div>
      {/* Wrapper div to make the avatar clickable */}
      <div
        className="bg-white inline-block rounded-md overflow-hidden cursor-pointer"
        ref={avatarRef}
        onClick={handleDivClick} // Handle click to trigger file input
      >
        <Avatar
          width={250}
          height={200}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          cropColor="tomato"
          cropRadius={0}
          backgroundColor="gray"
          exportAsSquare
          label="Add a Student Image"
          labelStyle={{ fontSize: "0.9rem", fontWeight: "bold" }}
        />
      </div>

      {/* Preview cropped image */}
      {profileUrl && (
        <div className="mt-4">
          <h1 className="font-bold text-sm my-3">Cropped Image</h1>
          <Image
            src={URL.createObjectURL(profileUrl)}
            className="border rounded-md border-gray-800"
            height={150}
            width={150}
            alt="Preview"
          />
        </div>
      )}
    </div>
  );
};

export default AvatarEdit;
