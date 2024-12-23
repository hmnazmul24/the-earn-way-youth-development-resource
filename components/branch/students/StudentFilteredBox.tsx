import {
  extractFiltersWithChildren,
  StudentPaidType,
} from "@/components/data/tableHelper";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStudentFilter from "@/hooks/useStudentFilterStore";
import { BranchStudentType } from "@/types/students";
import React, { useEffect } from "react";
import StudentResultModal from "./StudentResultModal";

const StudentFilteredBox = ({
  info,
  filteredInfo,
}: {
  info: StudentPaidType[];
  filteredInfo: StudentPaidType[];
}) => {
  const {
    setCourseDuration,
    setCourseRange,
    setCourseTrade,
    setCourseYear,
    courseDuration,
    courseRange,
    courseTrade,
    courseYear,
    resetFilter,
  } = useStudentFilter();
  // extracting the data
  const { admissionYears, courseDurations, courseTrades } =
    extractFiltersWithChildren(info);

  useEffect(() => {
    setCourseRange("");
  }, [courseDuration, setCourseRange]);

  return (
    <div className="   px-4 my-4 bg-white rounded-sm">
      <div className="mb-5 space-y-2">
        <h1 className="text-xl font-semibold">Filter Student</h1>
        <p className="text-sm text-gray-400">
          To get pdf of the student lists or download student result filter them
          by slecteding the required fields and click the download pdf button.{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4  gap-3">
        <Select onValueChange={setCourseTrade} value={courseTrade}>
          <SelectTrigger className="w-full branch_input">
            <SelectValue placeholder="Select Trade" />
          </SelectTrigger>
          <SelectContent>
            {courseTrades.map((item) => (
              <SelectItem value={item} key={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setCourseDuration} value={courseDuration}>
          <SelectTrigger className="w-full branch_input">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            {courseDurations.map((item) => (
              <SelectItem value={item.duration} key={item.duration}>
                {item.duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setCourseRange} value={courseRange}>
          <SelectTrigger className="w-full branch_input">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            {courseDuration &&
              courseDurations
                .filter((item) => item.duration === courseDuration)[0]
                .ranges.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setCourseYear} value={courseYear}>
          <SelectTrigger className="w-full branch_input">
            <SelectValue placeholder="Admission Year" />
          </SelectTrigger>
          <SelectContent>
            {admissionYears.map((item) => (
              <SelectItem value={item} key={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex items-center gap-3 justify-end mt-4">
        <Button
          onClick={resetFilter}
          variant={"outline"}
          className=" rounded-sm "
        >
          Reset Filter
        </Button>
        <StudentResultModal info={filteredInfo}>
          <div className="border hover:bg-gray-200 px-4 py-2 text-sm rounded-sm">
            Download PDF
          </div>
        </StudentResultModal>
      </div>
    </div>
  );
};

export default StudentFilteredBox;
