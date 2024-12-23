"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { it } from "node:test";
const Quality = () => {
  const programms = [
    {
      heading: "Licenses",
      icon: "/programms/icon1.png",
      text: "We provide licenses for establishing computer training centers, ensuring quality education and resources.",
      deley: 0,
      gradient: "bg-[radial-gradient(at_top_left,blue,#00e1ff,#0A97B0)]",
    },
    {
      heading: "Youth Empowerment Programs",
      icon: "/programms/icon2.png",
      text: "Our programs are designed to empower youth with the necessary skills and knowledge to succeed in the digital age.",
      deley: 0.2,
      gradient: "bg-[radial-gradient(at_top_left,teal,#05ffff,teal)]",
    },
    {
      heading: "Advanced IT Training",
      icon: "/programms/icon3.png",
      text: "We offer advanced IT training courses that cover the latest technologies and industry practices.",
      deley: 0.4,
      gradient: "bg-[radial-gradient(at_top_left,#4b4df4,cyan,blue)]",
    },
    {
      heading: "Community Development",
      icon: "/programms/icon4.jpg",
      text: "We work towards community development by providing opportunities and support for underprivileged youth.",
      deley: 0.6,
      gradient: "bg-[radial-gradient(at_top_left,blue,aqua,teal)]",
    },
  ];

  return (
    <div className="py-4 px-3 overflow-hidden relative  pb-20 lg:pb-0 flex flex-col items-center justify-between gap-2 lg:flex-row  lg:min-h-screen">
      <div className=" lg:absolute top-3 lg:top-10 text-[1.1rem] md:text-[1.4rem] lg:text-[1.8rem] text-center md:px-16 leading-5 lg:leading-10 text-amber-600 my-4">
        Since 2021, we have been partnering with education leaders to increase
        <span className="mx-3 border-b-2 border-b-yellow-500">
          equity and achievement for all students
        </span>
        .
      </div>

      {programms.map((item, i) => (
        <motion.div
          initial={{ scale: 0.4 }}
          whileInView={{ scale: 1 }}
          key={item.icon}
          className={cn(
            "w-[95%] md:w-2/3 lg:w-[24%]  border border-gray-200 flex items-center justify-center gap-3 flex-col duration-700  transition-all   text-center h-[300px] shadow-xl shadow-[#f0f0f0] px-4 hover:!scale-95 relative overflow-hidden group",
            item.gradient
          )}
        >
          <span className="inline-block transition-all absolute -top-5 right-0 h-[350px] w-52 group-hover:right-full group-hover:-translate-x-10 duration-300 bg-white/20  translate-x-32"></span>
          <div className="flex  items-center justify-center">
            <Image
              src={item.icon}
              height={60}
              width={60}
              alt="img"
              className="rounded-md"
            />
          </div>
          <h1 className="text-xl font-bold">{item.heading}</h1>
          <p className="text-sm">{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Quality;
