"use client";

import {
  addBannerAction,
  allBannersAction,
  anyBannerDeleteAction,
} from "@/actions/banner";
import { getBase64String } from "@/components/data/helpers";
import { customToast } from "@/components/shared/ToastContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

import { MdDeleteForever } from "react-icons/md";

const GalleryImage = () => {
  const queryClient = useQueryClient();
  let inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { data, isPending } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => await allBannersAction(),
  });
  const { mutate, isPending: createLoading } = useMutation({
    mutationFn: addBannerAction,
    onSuccess: ({ error, message }) => {
      if (error) return customToast("error", error);
      if (message) customToast("success", message);

      queryClient.invalidateQueries({ queryKey: ["banner"] });
      setFile(null);
    },
  });
  const { mutate: DeleteMutate, isPending: deleteLoading } = useMutation({
    mutationFn: anyBannerDeleteAction,
    onSuccess: ({ error, message }) => {
      if (error) return customToast("error", error);
      if (message) customToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["banner"] });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    // if (files![0].size > 1 * 1024 * 1024) {
    //   customToast("error", "image size must be less than 1 MB");
    //   return;
    // }
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  const handleUpload = async () => {
    if (file) {
      let base64file = await getBase64String(file);
      let formData = new FormData();
      formData.append("imgFile", base64file);
      mutate(formData);
    }
  };

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-2 md:p-0">
      <ul className="flex items-start gap-2 justify-center md:justify-start flex-wrap">
        {file === null ? (
          <li className="flex-none md:h-[200px] w-full md:w-[200px] rounded bg-white shadow-lg flex items-center justify-center">
            <Input
              type="file"
              ref={inputRef}
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            <Button
              className="bg-purple-500 hover:bg-purple-600"
              disabled={isPending}
              onClick={() => {
                if (data?.allImg?.length === 3) {
                  return customToast(
                    "error",
                    "you can't add more than 3 images"
                  );
                }
                if (inputRef.current) {
                  inputRef.current.click();
                }
              }}
            >
              upload banner
            </Button>
          </li>
        ) : (
          <li className="flex-none mt-2 w-full md:w-[200px] flex-col rounded  flex items-center justify-center">
            <Image
              height={200}
              width={200}
              src={URL.createObjectURL(file)}
              alt="logo"
              className="object-cover border w-full border-red-500 rounded"
            />

            <div className="flex items-center  gap-2 my-2 justify-between">
              <Button
                disabled={createLoading}
                className="bg-green-500 hover:bg-green-600"
                onClick={() => handleUpload()}
              >
                {createLoading ? "upload..." : "upload"}
              </Button>
              <Button
                disabled={createLoading}
                className="bg-red-500 hover:bg-red-600"
                onClick={() => {
                  setFile(null);
                }}
              >
                cancel
              </Button>
            </div>
          </li>
        )}
        {data?.allImg && data.allImg?.length > 0 ? (
          data.allImg?.map((item) => (
            <li
              key={item.id}
              className="p-2 bg-sky-300 relative  w-full md:w-[200px] rounded flex-none"
            >
              <Image
                height={200}
                width={200}
                src={item.secure_url}
                alt="logo"
                className="object-cover w-full aspect-[3/2]  rounded"
              />
              <button
                disabled={deleteLoading}
                className="text-sm absolute top-0 right-0  p-2 rounded-full bg-red-500 shadow-xl"
                onClick={() =>
                  DeleteMutate({ id: item.id, public_id: item.public_id })
                }
              >
                <MdDeleteForever className="text-white" />
              </button>
            </li>
          ))
        ) : (
          <div>no image has been uploaded</div>
        )}
      </ul>
    </div>
  );
};

export default GalleryImage;
