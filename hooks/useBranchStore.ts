import {
  BranchInfo,
  MoreInfo,
  Documents,
  PersonalInfo,
} from "@/Schema/branchSchema";
import { create } from "zustand";

interface FormState {
  branchInfo: BranchInfo;
  personalInfo: PersonalInfo;
  moreInfo: MoreInfo;
  documents: Documents;
  setBranchInfo: (info: Partial<BranchInfo>) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setMoreInfo: (info: Partial<MoreInfo>) => void;
  setDocuments: (info: Partial<Documents>) => void;
  resetForm: () => void;
  branchId: string;
  setBranchId: (id: string) => void;
  forgotEamil: string;
  setForgotEamil: (text: string) => void;
  forgotId: string;
  setForgotId: (id: string) => void;
}

const branchInfo = {
  branchName: "",
  branchMobile: "",
  branchEmail: "",
  instituteAge: "",
  noOfComputers: "",
};
const personalInfo = {
  fullName: "",
  fathersName: "",
  mothersName: "",
  gender: "",
  bloodGroup: "",
};
const moreInfo = {
  additionalMobile: "",
  division: "",
  district: "",
  upazila: "",
  address: "",
  postcode: "",
};
const documents = {
  ppSizePhoto: null,
  nationalIDCard: null,
  tradeLicense: null,
  signature: null,
};
const useBranchStore = create<FormState>((set) => ({
  branchInfo,
  documents,
  moreInfo,
  personalInfo,
  setBranchInfo: (info) =>
    set((state) => ({ branchInfo: { ...state.branchInfo, ...info } })),
  setPersonalInfo: (info) =>
    set((state) => ({ personalInfo: { ...state.personalInfo, ...info } })),
  setMoreInfo: (info) =>
    set((state) => ({ moreInfo: { ...state.moreInfo, ...info } })),
  setDocuments: (info) =>
    set((state) => ({ documents: { ...state.documents, ...info } })),
  resetForm: () =>
    set(() => ({
      branchInfo,
      personalInfo,
      moreInfo,
      documents,
    })),
  branchId: "",
  setBranchId: (id: string) => set({ branchId: id }),

  forgotEamil: "",
  setForgotEamil: (text: string) => set({ forgotEamil: text }),

  forgotId: "",
  setForgotId: (id: string) => set({ forgotId: id }),
}));

export default useBranchStore;
