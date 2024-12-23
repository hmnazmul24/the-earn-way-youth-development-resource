import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type CourseCardType = {
  code: string;
  name: string;
  url: string;
  index: number;
};
const CourseCard = ({ code, name, url, index }: CourseCardType) => {
  return (
    <motion.div
      initial={{ scale: 0.8, y: 10 }}
      transition={{ duration: 0.4 }}
      whileInView={{
        scale: 1,
        y: 0,
      }}
      className="w-full  overflow-hidden relative transition-all hover:rounded-tr-[50px] hover:bg-yellow-500 duration-500 flex items-start justify-center  my-2 md:w-[49%] lg:w-[24%] flex-none flex-wrap aspect-[6/7] border border-[#a5a5a549]"
    >
      <Image
        src={url}
        height={500}
        width={500}
        className="h-[75%] w-full object-cover"
        alt="course_card_Img"
      />

      <div className="h-[25%] pt-2 w-full absolute bottom-0 left-0">
        <span>code: {code}</span>
        <h1 className="text-lg font-bold">{name}</h1>{" "}
      </div>
      <div className="absolute top-0 p-3 py-1 left-4 bg-blue-700 shadow-xl border text-white rounded-b-[20px] flex items-center justify-center">
        {index + 1}
      </div>
    </motion.div>
  );
};

export default CourseCard;
