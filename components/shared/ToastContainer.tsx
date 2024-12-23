"use client";

import toast from "react-hot-toast";

export const customToast = (type: "success" | "error", text: string) => {
  if (type === "success") {
    toast.success(text, {
      style: {
        borderRadius: "3px",
        background: "green",
        color: "#fff",
      },
      duration: 1000,
    });
  }
  if (type === "error") {
    toast.error(text, {
      style: {
        borderRadius: "3px",
        background: "#ff4949",
        color: "#fff",
      },
      duration: 6000,
    });
  }
};
