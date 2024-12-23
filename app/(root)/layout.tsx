import RootFooter from "@/components/shared/RootFooter";
import RootNavbar from "@/components/shared/RootNavbar";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <RootNavbar />
      <div className="min-h-screen max-w-screen-2xl m-auto">{children}</div>
      <RootFooter />
    </div>
  );
};

export default RootLayout;
