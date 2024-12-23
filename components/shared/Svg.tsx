import Image from "next/image";
import React from "react";

type SvgPropsTyps = {
  svgFile: string;
  width: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  hideUp: "sm" | "md" | "lg" | "xl";
  effect?: boolean;
};

const Svg = ({
  svgFile,
  width,
  top,
  right,
  hideUp,
  bottom,
  left,
  effect = true,
}: SvgPropsTyps) => {
  return (
    <div
      style={{ top: top, right: right, bottom: bottom, left: left }}
      className={`absolute z-30 hidden transition-all ${hideUp}:block ${effect && "hover:rotate-12"}`}
    >
      <Image
        height={200}
        width={width}
        alt="icon"
        src={`/svgs/${svgFile}`}
      ></Image>
    </div>
  );
};

export default Svg;
