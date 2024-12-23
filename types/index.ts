export type BranchesTableType = {
  id: string;
  name: string;
  mobile: string;
  district: string;
  insAge: string;
  noOfCom: string;
  picture: string;
  varified: boolean;
};

// Combined type for Branch
export type GetBranchInfoType = {
  id: string;
  password?: string | null;
  role: "USER" | "ADMIN";
  isVarified: boolean;
  branchInfo?: BranchInfo | null;
  personalInfo?: PersonalInfo | null;
  moreInfo?: MoreInfo | null;
  ppSizePhoto: ImageUrlType | null;
  nationalIDCard: ImageUrlType | null;
  signature: ImageUrlType | null;
  tradeLicense: ImageUrlType | null;
  createdAt: Date;
};

// Type for BranchInfo
export type BranchInfo = {
  id: string;
  branchName: string;
  branchMobile: string;
  branchEmail: string;
  instituteAge: string;
  noOfComputers: string;
  branchId: string;
};

// Type for PersonalInfo
export type PersonalInfo = {
  id: string;
  fullName: string;
  fathersName: string;
  mothersName: string;
  gender: string;
  bloodGroup: string;
  branchId: string;
};

// Type for MoreInfo
export type MoreInfo = {
  id: string;
  additionalMobile?: string | null;
  division: string;
  district: string;
  upazila: string;
  address: string;
  postcode?: string | null;
  branchId: string;
};

// Type for Document
export type Document = {
  id: string;
  ppSizePhoto: string;
  tradeLicense: string;
  nationalIDCard: string;
  signature: string;
  branchId: string;
};

///fees type

export type CourseFeesType = {
  name: string;
  threeMonths: string;
  sixMonths: string;
  oneYear: string;
  twoYears: string;
  threeYears: string;
  fourYears: string;
};

export type Student = {
  id: string;
  name: string;
  genRoll: string | undefined;
  genReg: string | undefined;
  mobile: string;
  trade: string;
  session: string;
  isPaid: boolean;
  isAdminStudent: boolean;
  result: string;
  fees: string | boolean;
  picture: string | undefined;
  publicId: string;
};

export interface EditResultType {
  id: string;
  roll: string;
  result: string | null;
}
export interface EditResultTypeForBackend extends EditResultType {
  result: string;
}

export type LineChartArrType = {
  male: number;
  female: number;
  day: Date;
};

export type AdminBranchProgressType = {
  date: Date;
  count: number;
};

// certficate

export type CertificateInfoType = {
  roll: string;
  reg: string;
  issueDate: string;
  fullName: string;
  fathersName: string;
  mothersName: string;
  courseName: string;
  branchCode: string;
  branchName: string;
  held: string;
  grade: string;
};

export type ImageUrlType = {
  secure_url: string;
  public_id: string;
};
