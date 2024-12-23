"use client";
import { allTeamInfoAction } from "@/actions/team";
import Contact from "@/components/root/Contact";
import LottieComp from "@/components/shared/LottieComp";
import RootLoading from "@/components/shared/RootLoading";
import bulb from "@/public/lottie/bulb.json";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLeaf, FaLightbulb, FaUsers } from "react-icons/fa6";

const AboutUsPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const data = await allTeamInfoAction();
      const sortedData = data.allImg?.sort((a, b) => a.order - b.order);
      return sortedData;
    },
  });

  return (
    <div className="md:container m-auto md:py-10 min-h-screen font-incons  ">
      {isPending ? (
        <RootLoading isPending />
      ) : (
        <>
          {data && data?.length > 0 && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="p-4   z-50 text-center shadow-sm rounded-md relative pb-20 bg-stone-100"
            >
              {/* <div className="awesome-bg"></div> */}
              <LottieComp
                lottie={bulb}
                className=" w-[40px] md:w-[200px]  absolute top-0 right-0 md:right-10"
                height={100}
              />
              <motion.div>
                <h1 className="text-sm text-gray-400 ">our team</h1>
                <h2 className="text-3xl font-bold  mt-2">meet out team</h2>
                <h3 className="text-3xl font-bold text-gray-500 mt-2">
                  Passionate. Proactive. Expert
                </h3>
                <p className="mt-0 text-base text-gray-400">
                  We lead with care, our core value, and a shared passion for
                  connecting the world.
                </p>
              </motion.div>
              <div className="w-[250px] my-10 p-2  m-auto rounded-md   shadow-lg bg-white">
                <Image
                  src={data[0].secure_url}
                  height={200}
                  width={200}
                  alt="employee"
                  className="object-cover rounded-md aspect-square"
                />
                <div className="p-2">
                  <h1 className="font-bold">{data[0].name}</h1>
                  <h1 className="text-xs text-gray-400">{data[0].title}</h1>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold my-3">Other Employees</h1>
              </div>
              <div className="box-border mt-2 flex items-center gap-4 justify-center   flex-wrap">
                {data
                  .filter((_, i) => i !== 0)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="w-[250px] p-2 aspect-square my-5 rounded-md   shadow-lg bg-white"
                    >
                      <Image
                        src={item.secure_url}
                        height={200}
                        width={200}
                        alt="employee"
                        className="object-cover aspect-square rounded-md"
                      />
                      <div className="p-2">
                        <h1 className="font-bold">{item.name}</h1>
                        <h1 className="text-xs text-gray-400">{item.title}</h1>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* vision  */}
          <div className="mt-20 py-20">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-sm mb-5 text-gray-400">vision</h1>
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                our vision
              </h2>
              <p className="text-sm text-gray-500 mb-12 max-w-3xl mx-auto  leading-relaxed ">
                At our company, we strive to create a world where innovation and
                collaboration drive progress. Our vision is to empower
                individuals and organizations with cutting-edge solutions that
                make a lasting impact.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col items-center">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <FaLightbulb className="text-4xl text-sky-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Pioneering advancements in technology to shape a brighter
                    future.
                  </p>
                </div>
                <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col items-center">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <FaLeaf className="text-4xl text-sky-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Sustainability
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Building solutions that respect and protect our environment.
                  </p>
                </div>
                <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col items-center">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <FaUsers className="text-4xl text-sky-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Collaboration</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Connecting people and ideas to achieve extraordinary
                    results.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Us Section */}
          <Contact />
        </>
      )}
    </div>
  );
};

export default AboutUsPage;
