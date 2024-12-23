import { BranchStudentType } from "@/types/students";

export type StudentPaidType = {
  id: string;
  name: string;
  genRoll: string | undefined;
  genReg: string | undefined;
  mobile: string;
  trade: string;
  range: string;
  duration: string;
  createdAt: Date;
  isPaid: boolean;
  result: string;
  branchName: string;
  picture: string | undefined;
  studentInfo: BranchStudentType[];
};

export const consizeDataPaid = (
  data: BranchStudentType[],
  branchName: string
): StudentPaidType[] => {
  let students: StudentPaidType[] = data.map((item) => {
    return {
      id: item.id,
      mobile: item.mobile,
      name: item.name,
      picture: item.profileDoc?.secure_url,
      result: item.genResult ?? "",
      range: item.courseRange,
      trade: item.courseTrade,
      duration: item.courseDuration,
      createdAt: item.createdAt,
      genReg: item.genReg!,
      genRoll: item.genRoll!,
      isPaid: item.isPaid,
      studentInfo: data,
      branchName,
    };
  });

  let filteredStudent = students.filter((item, i) => item.isPaid === true);
  students = filteredStudent;
  return students;
};

export type FiltersWithChildrenType = {
  admissionYears: string[];
  courseDurations: {
    duration: string;
    ranges: string[];
  }[];
  courseTrades: string[];
};

export function extractFiltersWithChildren(
  data: StudentPaidType[]
): FiltersWithChildrenType {
  const uniqueValues = <T>(array: T[]): T[] => Array.from(new Set(array));

  // Group courseRanges by courseDuration
  const courseDurationsWithRanges = uniqueValues(
    data.map((student) => student.duration)
  ).map((duration) => ({
    duration,
    ranges: uniqueValues(
      data
        .filter((student) => student.duration === duration)
        .map((student) => student.range)
    ),
  }));

  return {
    admissionYears: uniqueValues(
      data.map((student) =>
        new Date(student.createdAt).getFullYear().toString()
      )
    ),
    courseDurations: courseDurationsWithRanges,
    courseTrades: uniqueValues(data.map((student) => student.trade)),
  };
}
