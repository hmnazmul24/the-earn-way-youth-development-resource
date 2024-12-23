"use client";

import React, { Fragment, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import AnimatedBtn from "./AnimatedBtn";
import { TypewriterEffect } from "../framerUi/TypeWritter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { allBannersAction } from "@/actions/banner";
import RootLoading from "../shared/RootLoading";

const Hero = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [banner, setBanners] = useState<string[]>([]);
  const { isPending } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const data = await allBannersAction();
      if (data.allImg) {
        const imagArr = data.allImg.map((item) => {
          return item.secure_url;
        });
        setBanners(imagArr);
      }
      return data;
    },
  });

  const slider_imageData = ["/11.jpg", "/16.jpg", "/13.jpg"];

  const words = [
    {
      text: "The",
    },
    {
      text: "Earn",
    },
    {
      text: "Way",
    },
  ];
  const words2 = [
    {
      text: "Youth",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Development",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Resource.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Fragment>
      {isPending ? (
        <RootLoading isPending />
      ) : (
        <div className="lg:h-[85vh] w-full  flex items-center lg:flex-row  flex-col lg:justify-between">
          <div className=" w-full  h-full relative md:w-3/5 bg-slate-50">
            <div className="absolute h-full  top-0 left-0 ">
              <div className="h-full w-full z-20 absolute top-0 left-0 bg-[#00000098] "></div>
              <Image
                height={800}
                width={800}
                alt="banner"
                className="relative z-10  object-cover  flex-none h-full"
                src={"/banner.png"}
              />
            </div>
            <div className="z-30 relative mt-20 ml-3 md:ml-8 text-white">
              <motion.h1
                initial={{ opacity: 0, zoom: 0.9 }}
                animate={{ opacity: 1, zoom: 1 }}
                transition={{ duration: 1 }}
                className="text-[3rem] md:text-[3.9rem] leading-10 font-extrabold uppercase inline bg-gradient-to-r font-salsa from-orange-600 via-orange-300 to-orange-500 bg-clip-text text-transparent"
              >
                The earn Way
              </motion.h1>
              <br />
              <motion.h1
                initial={{ opacity: 0, zoom: 0.9 }}
                animate={{ opacity: 1, zoom: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-[1.8rem] mt-4 md:mt-0 md:text-[2.5rem]  lg:leading-[6rem]  font-extrabold uppercase s inline bg-gradient-to-r font-salsa from-orange-600 via-orange-300 to-orange-500 bg-clip-text text-transparent"
              >
                Youth Development Resource
              </motion.h1>
              {/* <h1 className="uppercase font-salsa text-sm text-[3.9rem] font-bold">
            <TypewriterEffect
              words={words}
              className="text-3xl md:text-[3.3rem]"
            />
          </h1>
          <h2 className="uppercase font-salsa md:min-h-[150px] text-sm min-h-28 leading-[50px] text-[1.5rem] font-bold">
            <TypewriterEffect
              words={words2}
              className="text-3xl md:text-[1.5rem]"
            />
          </h2> */}
              <motion.p
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-[1.1rem] md:text-[1.5rem] mt-11 my-6 font-bangla leading-8 md:leading-10   mb-5 md:mb-20 "
              >
                আমরা কম্পিউটার প্রশিক্ষণ কেন্দ্রের ব্রাঞ্চ খোলার লাইসেন্স ও
                অনুমতি প্রদান করছি, একটি ব্রাঞ্চের উদ্যোক্তা হতে এখনই আবেদন করুন
              </motion.p>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-10"
              >
                <AnimatedBtn />
              </motion.div>
            </div>
          </div>
          <div className="lg:h-full h-[400px]  md:h-[700px]  px-2 w-full lg:w-2/5 flex items-center justify-center bg-yellow-500 ">
            <div className="w-full h-full py-4">
              <Swiper
                className=" w-full h-[65%] md:h-[80%] content-center"
                direction={isLargeScreen ? "vertical" : "horizontal"}
                modules={[Autoplay]}
                spaceBetween={5}
                slidesPerView={isLargeScreen ? 2 : 1}
                speed={1000}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
              >
                {banner.map((item, i) => (
                  <SwiperSlide key={i} className="border-4 border-yellow-500">
                    <Image
                      src={item}
                      className="w-full"
                      height={1000}
                      width={1000}
                      alt="main_logo"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className=" p-3 text-sm md:text-lg">
                Note:Empowering Youth Entrepreneurs
                <span className={`text-sky-800 font-bold mx-3 `}>
                  The earn way youth development resource
                </span>
                allow to Launch & Manage Your Own Computer Training Center
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Hero;
