import { CourseFeesType, Student } from "@/types";
import { BranchStudentType } from "@/types/students";

export const PriceSettingHelper = ({
  title,
  feesData,
  duration,
}: {
  title: string;
  feesData: CourseFeesType[];
  duration: string;
}): string | boolean => {
  let filterData = feesData.filter((item) => item.name === title);
  if (filterData.length === 0) {
    return false;
  }
  if (duration === "3 months") return filterData[0].threeMonths;
  if (duration === "6 months") return filterData[0].sixMonths;
  if (duration === "1 year") return filterData[0].oneYear;
  if (duration === "2 years") return filterData[0].twoYears;
  if (duration === "3 years") return filterData[0].threeYears;
  if (duration === "4 years") return filterData[0].fourYears;
  return false;
};

export const consizeData = ({
  data,
  feesInfo,
  isAdminStudent,
}: {
  data: BranchStudentType[];
  feesInfo: CourseFeesType[];
  isAdminStudent: boolean;
}): Student[] => {
  let students: Student[] = data.map((item) => {
    return {
      id: item.id,
      mobile: item.mobile,
      name: item.name,
      picture: item.profileDoc?.secure_url,
      publicId: item.profileDoc?.public_id!,
      result: item.passedResult,
      session: item.courseRange,
      trade: item.courseTrade,
      genReg: item.genReg!,
      genRoll: item.genRoll!,
      isPaid: item.isPaid,
      isAdminStudent,
      fees: PriceSettingHelper({
        duration: item.courseDuration,
        title: item.courseTrade,
        feesData: feesInfo,
      }),
    };
  });

  let filteredStudent = students.filter((item, i) => item.isPaid === false);
  students = filteredStudent;
  return students;
};
