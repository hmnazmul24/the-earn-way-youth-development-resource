"use client";

import ApplyBranch from "@/components/root/ApplyBranch";
import Contact from "@/components/root/Contact";
import Hero from "@/components/root/Hero";
import HowItsWork from "@/components/root/HowItsWork";
import PopularCourse from "@/components/root/PopularCourse";
import { motion, useScroll } from "framer-motion";

import Quality from "@/components/root/Quality";
import React, { Fragment } from "react";
import AnimatedCar from "@/components/root/AnimatedCar";

const HomePage = () => {
  const { scrollYProgress } = useScroll();

  return (
    <Fragment>
      <div>
        <motion.div
          className="fixed z-50 right-0 top-0 left-0 origin-left h-1 md:h-2 bg-amber-500"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="w-full md:container">
          <Hero />
          <Quality />
          <HowItsWork />
          <PopularCourse />
          <Contact />
          <AnimatedCar />
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
