import React from "react";

const TextShorter = ({ text, num }: { text: string; num: number }) => {
  return <>{text.length > num ? <>{text.slice(0, num)}...</> : <>{text}</>}</>;
};

export default TextShorter;
