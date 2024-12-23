"use client";

import {
  allNoticeAction,
  deleteNoticeAction,
  newNoticeAction,
} from "@/actions/Admin";
import FormatDate from "@/components/shared/FormatDate";
import { customToast } from "@/components/shared/ToastContainer";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const Notices = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState<string>("");
  const { data, isPending } = useQuery({
    queryKey: ["notice"],
    queryFn: async () => await allNoticeAction(),
  });
  const { mutate, isPending: createLoading } = useMutation({
    mutationFn: newNoticeAction,
    onSuccess: ({ error, message }) => {
      setText("");
      if (error) customToast("error", error);
      if (message) customToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["notice"] });
    },
  });
  const { mutate: DeleteMutate, isPending: deleteLoading } = useMutation({
    mutationFn: deleteNoticeAction,
    onSuccess: ({ error, message }) => {
      if (error) customToast("error", error);
      if (message) customToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["notice"] });
    },
  });

  return (
    <div>
      <div className=" bg-stone-200  rounded">
        <textarea
          className="min-h-64  w-full bg-white rounded p-4 border border-stone-400"
          placeholder="enter a new notice..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="flex items-center justify-end p-4">
          <Button disabled={createLoading} onClick={() => mutate({ text })}>
            Create Notice
          </Button>
        </div>
      </div>
      <div className="mt-5 rounded ">
        <h1 className="underline">{`All notice (${
          !isPending && data?.allNotice && data.allNotice.length
        })`}</h1>
        {isPending && <div>loading....</div>}
        {data?.allNotice && data.allNotice.length > 0 ? (
          <ul>
            {data.allNotice
              .slice()
              .reverse()
              .map((item) => (
                <li
                  key={item.id}
                  className="bg-stone-200 p-3 my-3 rounded relative"
                >
                  <div className="text-sm font-bold">
                    Date: <FormatDate date={item.createdAt} />
                  </div>
                  <p className="">{item.text}</p>
                  <Button
                    disabled={deleteLoading}
                    className="absolute bg-red-500 hover:bg-red-600 -top-2 text-sm right-4"
                    onClick={() => DeleteMutate(item.id)}
                  >
                    {deleteLoading ? "Deleting" : "Delete"}
                  </Button>
                </li>
              ))}
          </ul>
        ) : (
          <div>no notice has been crated</div>
        )}
      </div>
    </div>
  );
};

export default Notices;
