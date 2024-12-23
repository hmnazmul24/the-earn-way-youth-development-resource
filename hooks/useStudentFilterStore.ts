import { create } from "zustand";

interface FilterInfo {
  courseTrade: string;
  setCourseTrade: (info: string) => void;
  courseDuration: string;
  setCourseDuration: (info: string) => void;
  courseRange: string;
  setCourseRange: (info: string) => void;
  courseYear: string;
  setCourseYear: (info: string) => void;
  resetFilter: () => void;
}

const useStudentFilter = create<FilterInfo>((set) => ({
  courseDuration: "",
  courseRange: "",
  courseTrade: "",
  courseYear: "",
  setCourseDuration: (info) => set({ courseDuration: info }),
  setCourseRange: (info) => set({ courseRange: info }),
  setCourseTrade: (info) => set({ courseTrade: info }),
  setCourseYear: (info) => set({ courseYear: info }),
  resetFilter: () =>
    set({
      courseDuration: "",
      courseRange: "",
      courseTrade: "",
      courseYear: "",
    }),
}));

export default useStudentFilter;
