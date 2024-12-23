import { Button } from "../ui/button";
import Lottie from "react-lottie";
import animationData from "../../public/lottie/boom.json";
import { useRouter } from "next/navigation";

const AnimatedBtn = () => {
  const router = useRouter();
  const defaultOptions = {
    loop: true,
    autoplay: true,

    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="relative">
      <Button
        onClick={() => router.push("/branch-apply")}
        className="bg-yellow-500 hover:bg-yellow-600 shadow-xl text-black rounded-none z-10 p-5 md:p-6 relative"
      >
        Apply for Branch
      </Button>
      <div className="absolute -top-14  left-6">
        <Lottie speed={0.5} options={defaultOptions} height={140} />
      </div>
    </div>
  );
};

export default AnimatedBtn;
