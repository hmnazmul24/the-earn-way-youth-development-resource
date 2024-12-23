"use client";

import {
  addGalleryImgAction,
  allGalleryImgAction,
  anyImgDeleteAction,
} from "@/actions/Admin";
import {
  addTeamInfoAction,
  allTeamInfoAction,
  deleteTeamInfoAction,
} from "@/actions/team";
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
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const { data, isPending } = useQuery({
    queryKey: ["team"],
    queryFn: async () => await allTeamInfoAction(),
  });
  const { mutate, isPending: createLoading } = useMutation({
    mutationFn: addTeamInfoAction,
    onSuccess: ({ error, message }) => {
      if (error) return customToast("error", error);
      if (message) customToast("success", message);
      setName("");
      setTitle("");
      setOrder("");
      queryClient.invalidateQueries({ queryKey: ["team"] });
      setFile(null);
    },
  });
  const { mutate: DeleteMutate, isPending: deleteLoading } = useMutation({
    mutationFn: deleteTeamInfoAction,
    onSuccess: ({ error, message }) => {
      if (error) return customToast("error", error);
      if (message) customToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  const handleUpload = async () => {
    if (!name || !title || !order) {
      return customToast("error", "the text should be at least 10 char");
    }

    if (file) {
      let base64file = await getBase64String(file);
      let formData = new FormData();
      formData.append("name", JSON.stringify(name));
      formData.append("title", JSON.stringify(title));
      formData.append("order", order);
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
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.click();
                }
              }}
            >
              upload new
            </Button>
          </li>
        ) : (
          <li className="flex-none mt-2 space-y-2 w-full md:w-[200px] flex-col rounded  flex items-center justify-center">
            <Image
              height={200}
              width={200}
              src={URL.createObjectURL(file)}
              alt="logo"
              className="object-cover border w-full border-red-500 rounded"
            />
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border border-gray-300"
              placeholder="add name"
            />
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white border border-gray-300"
              placeholder="add title"
            />
            <Input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="bg-white border border-gray-300"
              placeholder="set order"
            />
            <div className="flex items-center  gap-2 my-2 justify-end ">
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
                className="object-cover w-full aspect-[3/3]  rounded"
              />
              <p className="text-sm bg-white p-1 font-bold">{item.name}</p>
              <p className="text-sm bg-white p-1">{item.title}</p>
              <p className="text-sm bg-white p-1">order: {item.order}</p>
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
