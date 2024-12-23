"use client";

import useStudentStore from "@/hooks/useStudentStore";
import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

type DateValue = {
  startDate: Date | null;
  endDate: Date | null;
};

const SingleDatePicker: React.FC = () => {
  const { setStudentInfo, studentInfo } = useStudentStore();
  const [value, setValue] = useState<Date | null | string>("Date of Birth");

  const handleValueChange = (newValue: any) => {
    if (newValue.startDate) {
      let data = new Date(newValue.startDate);
      setValue(data);
      setStudentInfo({ dateOfBirth: newValue.startDate });
    }
  };
  useEffect(() => {
    if (studentInfo.dateOfBirth !== "") {
      setValue(studentInfo.dateOfBirth);
    }
  }, [studentInfo.dateOfBirth]);

  return (
    <div className="w-full py-1 rounded bg-slate-50">
      <Datepicker
        primaryColor="orange"
        placeholder="Date of Birth"
        value={{ startDate: value, endDate: value }}
        onChange={handleValueChange}
        asSingle={true}
        useRange={false}
      />
    </div>
  );
};

export default SingleDatePicker;
