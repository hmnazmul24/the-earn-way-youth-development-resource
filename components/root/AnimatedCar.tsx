import React from "react";
import LottieComp from "../shared/LottieComp";
import AnimatedCarLootie from "@/public/lottie/car.json";

const AnimatedCar = () => {
  return (
    <div className="w-full translate-y-2 overflow-hidden">
      <LottieComp
        lottie={AnimatedCarLootie}
        height={100}
        className="w-52 lottie-car"
      />
    </div>
  );
};

export default AnimatedCar;
