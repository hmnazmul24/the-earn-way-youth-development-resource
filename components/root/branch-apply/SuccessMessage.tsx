import { Button } from "@/components/ui/button";
import React from "react";

const SuccessMessage = ({ clear }: { clear: () => void }) => {
  return (
    <div className="flex bg-[#0000001d] fixed top-0 left-0 z-30 items-center justify-center h-screen w-full p-4">
      <div className="max-w-lg bg-green-500 p-8 font-bangla rounded-sm">
        <h1> আপনার ফর্ম সফলভাবে জমা হয়েছে।</h1>
        <p className="my-3">
          আমাদের নিয়োজিত কর্মী দ্বারা পর্যালোচনা শেষে আপনাকে ইমেইলের মাধ্যমে
          অবহিত করা হবে এবং লগইন ইমেইল ও পাসওয়ার্ড প্রদান করা হবে।
        </p>
        <h3 className="text-sm my-3">
          প্রয়োজনে আমাদের কল করুন{" "}
          <span className="font-incons ml-3 font-bold">01880110842</span>
        </h3>
        <div className="flex items-center justify-end">
          <Button onClick={clear} className="font-bangla rounded-sm">
            ঠিক আছে
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
