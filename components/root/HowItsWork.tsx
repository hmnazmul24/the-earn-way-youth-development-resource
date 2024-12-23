"use client";

import Image from "next/image";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaClock, FaCodeBranch } from "react-icons/fa6";
import { motion } from "framer-motion";
const HowItsWork = () => {
  const programms = [
    {
      icon: <FaCodeBranch />,
      step: " Apply for a Branch ",
      des: "you should click the Apply for Branch button to go to the branch apply page ",
    },
    {
      icon: <FaInfoCircle />,
      step: " Fill in Your Information",
      des: "Complete the required forms with accurate details about your training center, including location, facilities, and intended programs. Make sure all information is correct and up-to-date.",
    },
    {
      icon: <FaClock />,
      step: " Wait for Review",
      des: "After submission, your application will be reviewed by our team. Please wait patiently for feedback and further instructions. We will notify you of the outcome and next steps.",
    },
  ];
  return (
    <div className="min-h-screen py-7 md:py-0 flex items-center justify-center overflow-hidden relative px-6">
      <div className="bg-[#000000af] top-0 left-0 z-10 w-full absolute h-full"></div>
      <Image
        src={"/banner2.png"}
        height={800}
        width={800}
        alt="banner2"
        className="absolute top-0 left-0 object-cover z-0 h-full lg:w-full"
      />
      <div className="text-white relative flex items-center justify-center flex-col text-center z-20">
        <h1 className="md:text-3xl text-xl md:mb-10 underline text-amber-500">
          Three Steps to be owner of a Branch
        </h1>
        <div className="mt-8 flex gap-3 w-full flex-col md:flex-row items-start justify-around">
          {programms.map((item, i) => (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="w-full p-3 md:p-0 md:w-[24%]"
              key={item.des}
            >
              <div className="items-center flex justify-center">
                <div className="p-3 rounded-full bg-[#ffff0016] text-[1.5rem] text-yellow-500">
                  {item.icon}
                </div>
              </div>
              <h1 className="my-6 text-lg font-bold ">
                step {i + 1}: {item.step}
              </h1>
              <p className="text-sm leading-6">{item.des}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItsWork;
