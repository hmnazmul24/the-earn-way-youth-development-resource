"use client";

import React, { ReactNode, RefObject, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import SocialIcons from "./SocialIcons";

const SheetContext = ({ children }: { children: ReactNode }) => {
  const sheetRef: RefObject<HTMLButtonElement> = useRef(null);
  const navData = [
    { text: "Apply Branch", link: "/branch-apply" },
    { text: "Student Result", link: "/student-result" },
    { text: "All Courses", link: "/all-courses" },
    { text: "Image Gallary", link: "/gallery" },
    { text: "About Us & Our Team", link: "/about-us" },
    { text: "Contact", link: "/contact" },
  ];
  return (
    <div>
      <Sheet>
        <SheetTrigger ref={sheetRef}>{children}</SheetTrigger>
        <SheetContent className="w-full">
          <SheetHeader>
            <div className="p-5 mt-4 flex items-center justify-center bg-yellow-500">
              <Image
                src={"/logo.png"}
                height={200}
                width={200}
                alt="nav_logo"
              />
            </div>
          </SheetHeader>
          <ul className="mt-8">
            {navData.map((item) => (
              <Link key={item.link} href={item.link}>
                <li
                  className="p-3 py-2 text-yellow-600 hover:text-blue-500"
                  onClick={() => sheetRef.current?.click()}
                >
                  {item.text}
                </li>
              </Link>
            ))}
          </ul>
          <div className="flex mt-6 items-start justify-start">
            <div>
              <SocialIcons className="" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetContext;
