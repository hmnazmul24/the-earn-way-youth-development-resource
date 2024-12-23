"use client";
import { allNoticeAction } from "@/actions/Admin";
import FormatDate from "@/components/shared/FormatDate";
import TextShorter from "@/components/shared/TextShorter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const LastNotice = ({ notice, date }: { notice: string; date: Date }) => {
  return (
    <div className="p-4 rounded-lg border-2 border-gray-100 shadow-md">
      <h1 className="text-amber-500 font-bold">
        <span>Last Notice : </span>
        <FormatDate date={date} />
      </h1>
      <p className="mt-2">
        <TextShorter text={notice} num={200} />
        <Link href="/branch/info/notices">
          <Button className="text-sm p-2 bg-sky-500 mt-4">View All</Button>
        </Link>
      </p>
    </div>
  );
};

export default LastNotice;
