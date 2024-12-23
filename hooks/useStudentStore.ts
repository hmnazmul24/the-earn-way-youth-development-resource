import { StudentType } from "@/Schema/studentSchema";
import { create } from "zustand";

interface FormState {
  studentInfo: StudentType;
  profileUrl: File | null;
  existImgUrl: string;
  setPorfileUrl: (file: File | null) => void;
  setStudentInfo: (info: Partial<StudentType>) => void;
  setExistImgUrl: (info: string) => void;
  resetForm: () => void;
}

const intialStudentData: StudentType = {
  bloodGroup: "",
  gender: "",
  courseDuration: "",
  courseRange: "",
  courseTrade: "",
  dateOfBirth: "",
  fatherName: "",
  mediam: "",
  mobile: "",
  motherName: "",
  name: "",
  nationality: "",
  passedBoard: "",
  passedResult: "",
  passedRoll: "",
  passedType: "SSC",
  passedYear: "",
  religion: "",
  email: "",
};

const useStudentStore = create<FormState>((set) => ({
  studentInfo: intialStudentData,
  profileUrl: null,
  setPorfileUrl: (info: File | null) => set({ profileUrl: info }),
  setStudentInfo: (info) =>
    set((state) => ({ studentInfo: { ...state.studentInfo, ...info } })),
  resetForm: () =>
    set(() => ({
      studentInfo: intialStudentData,
      profileUrl: null,
    })),
  existImgUrl: "",
  setExistImgUrl: (url) => set({ existImgUrl: url }),
}));

export default useStudentStore;
