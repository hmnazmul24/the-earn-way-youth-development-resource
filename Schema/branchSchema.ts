import { z } from "zod";

// BranchInfo Zod schema with custom messages
const BranchInfoSchema = z.object({
  branchName: z.string().min(1, { message: "Branch Name cannot be empty" }),
  branchMobile: z
    .string()
    .length(11, { message: "mobile number must be 11 character" }),
  branchEmail: z.string().email({ message: "Invalid email address" }),
  instituteAge: z
    .string()
    .min(1, { message: "Institution Age cannot be empty" }),
  noOfComputers: z
    .string()
    .min(1, { message: "Number of Computers cannot be empty" }),
});

// PersonalInfo Zod schema with custom messages
const PersonalInfoSchema = z.object({
  fullName: z.string().min(1, { message: "Personal Name cannot be empty" }),
  fathersName: z.string().min(1, { message: "Father's Name cannot be empty" }),
  mothersName: z.string().min(1, { message: "Mother's Name cannot be empty" }),
  gender: z.string().min(1, { message: "Gender cannot be empty" }),
  bloodGroup: z.string().min(1, { message: "Blood Group cannot be empty" }),
});

// MoreInfo Zod schema with custom messages
const MoreInfoSchema = z.object({
  additionalMobile: z.string().optional(),
  division: z.string().min(1, { message: "Division cannot be empty" }),
  district: z.string().min(1, { message: "District cannot be empty" }),
  upazila: z.string().min(1, { message: "Upazila cannot be empty" }),
  address: z.string().min(1, { message: "Address cannot be empty" }),
  postcode: z.string().optional(),
});

let DocumentsSchema = z.object({
  ppSizePhoto: z
    .instanceof(File, { message: "Passport size photo is required" })
    .nullable(),
  nationalIDCard: z
    .instanceof(File, { message: "National ID card is required" })
    .nullable(),
  tradeLicense: z
    .instanceof(File, { message: "Trade license is required" })
    .nullable(),
  signature: z
    .instanceof(File, { message: "Signature is required" })
    .nullable(),
});

// Combined schema
export const BranchSchema = z.object({
  branchInfo: BranchInfoSchema,
  personalInfo: PersonalInfoSchema,
  moreInfo: MoreInfoSchema,
});

// Export the types
export type BranchInfo = z.infer<typeof BranchInfoSchema>;
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type MoreInfo = z.infer<typeof MoreInfoSchema>;
export type Documents = z.infer<typeof DocumentsSchema>;

export type BranchType = {
  branchInfo: BranchInfo;
  personalInfo: PersonalInfo;
  moreInfo: MoreInfo;
  documents: Documents;
};
