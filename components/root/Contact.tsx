import Image from "next/image";
import React from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { contact_bg_Img } from "../data";
const Contact = ({ isBgRemoved }: { isBgRemoved?: boolean }) => {
  const locationInfo = [
    {
      icon: <FaLocationCrosshairs />,
      info: "Sohidul Islam Market, 2nd floor, Damurhuda,Chuadanga,BD",
      link: "https://maps.app.goo.gl/t833Num97ikau2T46",
    },
    {
      icon: <FaPhoneFlip />,
      info: "01880110842",
      link: "tel:01880110842",
    },
    {
      icon: <FaFacebookF />,
      info: "FaceBook Page",
      link: "https://www.facebook.com/the.earn.way?mibextid=ZbWKwL",
    },
  ];

  return (
    <div
      id="contact"
      className="main-starts-box relative md:h-[200px] mt-3  z-10"
    >
      <h1 className="text"></h1>

      <div
        className={`absolute z-50 top-32 md:top-0 left-0 md:h-full w-full overflow-hidden`}
      >
        <motion.div
          initial={{ y: -50, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-red-300 top-40 mt-20 ml-20 z-10  h-[450px] hidden lg:block  w-[500px]"
        >
          <Image
            src={contact_bg_Img}
            height={800}
            width={800}
            alt="contactImg"
            className="h-full z-20 object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.8 }}
          className="bg-white px-5 shadow-lg flex items-center justify-start flex-col lg:absolute top-[200px] lg:left-[500px] h-[500px] md:h-[450px] lg:w-[500px]"
        >
          <h1 className="text-2xl font-bold p-6 bg-amber-500">Contact Us</h1>
          <motion.p className="text-sm my-3">
            Our IT company provides computer training center licenses,
            empowering youth with essential digital skills, fostering
            innovation, and supporting career growth. Our comprehensive programs
            ensure high-quality education, equipping students with the tools
            needed for a successful future in technology.
          </motion.p>
          <ul className="flex items-start flex-col gap-3 mt-4 justify-start">
            {locationInfo.map((item, i) => (
              <Link key={i} href={item.link}>
                <li className="flex items-center justify-center gap-4 text-blue-500">
                  <span className="p-2 rounded-full border border-[yellow] bg-yellow-50 text-yellow-500">
                    {item.icon}
                  </span>
                  <span>{item.info}</span>
                </li>
              </Link>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className=" starts-background hidden md:block"></div>
    </div>
  );
};

export default Contact;

{
  /* <Svg hideUp="lg" svgFile="/line.svg" width={300} right={0} top={0} />
      <Svg hideUp="lg" svgFile="/line.svg" width={200} right={200} top={300} />
      <Svg hideUp="lg" svgFile="/line.svg" width={200} right={100} bottom={0} />
      <Svg hideUp="lg" svgFile="/line.svg" width={80} right={20} bottom={100} />
      <Svg hideUp="lg" svgFile="/line.svg" width={100} left={100} top={400} />
      <Svg hideUp="lg" svgFile="/line.svg" width={150} left={150} top={50} />
      <Svg hideUp="lg" svgFile="/line.svg" width={400} left={70} top={470} /> */
}
