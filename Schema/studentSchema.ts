import { z } from "zod";

// Define the Zod schema with custom messages
const studentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  mobile: z.string().min(1, { message: "Mobile number is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  religion: z.string().min(1, { message: "Religion is required" }),
  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
  gender: z.string().min(1, { message: "Gender is requrired" }),
  email: z.string().optional(),
  courseDuration: z.string().min(1, { message: "Course duration is required" }),
  courseRange: z.string().min(1, { message: "Course range is required" }),
  courseTrade: z.string().min(1, { message: "Course trade is required" }),
  mediam: z.string().min(1, { message: "Medium is required" }),
  passedBoard: z.string().min(1, { message: "JSC/SSC board is required" }),
  passedYear: z.string().min(1, { message: "JSC/SSC year is required" }),
  passedRoll: z.string().min(1, { message: "JSC/SSC roll is required" }),
  passedResult: z.string().min(1, { message: "JSC/SSC result is required" }),
  passedType: z.enum(["JSC", "SSC"], { message: "Invalid passed type" }),
});

// Export the schema
export const StudentSchema = studentSchema;

// Export the type
export type StudentType = z.infer<typeof studentSchema>;
