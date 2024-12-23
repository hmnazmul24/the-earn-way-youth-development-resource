import Lottie from "react-lottie";

const LottieComp = ({
  lottie,
  height,
  className,
  speed,
}: {
  lottie: any;
  height: number;
  speed?: number;
  className?: string;
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,

    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={className}>
      <Lottie speed={speed} options={defaultOptions} height={height} />
    </div>
  );
};

export default LottieComp;
