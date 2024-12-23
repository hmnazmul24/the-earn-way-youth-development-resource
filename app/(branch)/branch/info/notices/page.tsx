"use client";

import { allNoticeAction } from "@/actions/Admin";
import FormatDate from "@/components/shared/FormatDate";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const NoticeShowPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["notice"],
    queryFn: async () => await allNoticeAction(),
  });

  if (isPending) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h1 className=" my-4 text-sm pl-4 md:text-[1.6rem]  underline text-blue-500 ">
        Notices
      </h1>
      {data?.allNotice?.length === 0 ? (
        <div className="my-6 text-center">there is no such any notice !</div>
      ) : (
        <div className="grid  grid-cols-1 md:grid-cols-2 row-auto gap-4">
          {data?.allNotice
            ?.slice(0, 6)
            .reverse()
            .map((item, i) => (
              <div
                key={item.id}
                className="rounded text-stone-400 shadow-lg bg-white-100 p-4"
              >
                <h1 className={`my-2 ${i === 0 && "text-sky-500 "}`}>
                  <FormatDate date={item.createdAt} /> <span></span>
                  {i === 0 && (
                    <span className="bg-sky-500 text-white  p-2 text-sm rounded-[50px] shadow-xl">
                      Current Notice
                    </span>
                  )}
                </h1>
                <p className={`${i === 0 && "text-black"}`}>{item.text}</p>{" "}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NoticeShowPage;
