import DashboardWrapper from "@/components/shared/DashboardWrapper";
import { ReactNode } from "react";

const BranchLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <DashboardWrapper>
        <div className="md:px-6 md:py-6 min-h-screen  bg-stone-100">
          {children}
        </div>
      </DashboardWrapper>
    </div>
  );
};

export default BranchLayout;
