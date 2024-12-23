"use server";

import {
  decryptCryptoPassword,
  generateUserCredentials,
  jwtDecode,
} from "@/data/auth";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/data/cloudinary_file_upload";
import { deleteFromCloud } from "@/data/cloudinary_upload";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export const createEmployee = async (formData: FormData) => {
  try {
    let token = cookies().get("branch_token")?.value;
    if (!token) {
      return { message: "token does'nt exist" };
    }
    let { id } = jwtDecode(token);
    const today = new Date();

    const imgFile = formData.get("imgFile") as string; // Assuming the image is being sent as a string (e.g., base64)
    const fullName = formData.get("fullName") as string;
    const fatherName = formData.get("fatherName") as string;
    const phoneNumber = formData.get("contactNo") as string;
    const address = formData.get("address") as string;
    const position = formData.get("position") as string;
    const fixedSalary = Number(formData.get("salery")) as number;

    const { public_id, secure_url } = await uploadToCloudinary({
      file: imgFile,
      folder: "employee",
    });

    // generating random username and password
    const { password, userName } = await generateUserCredentials(fullName);

    await prisma.employee.create({
      data: {
        branchId: id,
        address,
        fatherName,
        fullName,
        fixedSalary,
        phoneNumber,
        position,
        public_id: public_id!,
        secure_url: secure_url!,
        salaryChangedDate: today,
        username: userName,
        password,
      },
    });

    return { message: "New employee created" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const updateSalary = async ({
  employeeId,
  updatedSalary,
}: {
  employeeId: string;
  updatedSalary: number;
}) => {
  try {
    await prisma.employee.update({
      where: { id: employeeId },
      data: {
        fixedSalary: updatedSalary,
      },
    });
    return { message: "salary updated" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const employeeDelete = async ({
  employeeId,
  imagePublicId,
}: {
  employeeId: string;
  imagePublicId: string;
}) => {
  try {
    await deleteFromCloudinary(imagePublicId);
    await prisma.employee.delete({ where: { id: employeeId } });
    return { message: "Employee has deleted" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const allEmployees = async () => {
  try {
    let token = cookies().get("branch_token")?.value!;
    let { id } = jwtDecode(token);
    let employeesWithDecryptedPassword = await prisma.employee.findMany({
      where: { branchId: id },
      orderBy: { id: "desc" },
    });

    let employees = employeesWithDecryptedPassword.map((info) => ({
      ...info,
      password: decryptCryptoPassword(info.password),
    }));

    return { employees };
  } catch (error) {
    return { error: "internal server error" };
  }
};

// access control

export const employeeAccessSwitch = async (employeeId: string) => {
  try {
    let employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });
    if (!employee) {
      return { error: "employee does'nt exists" };
    }
    await prisma.employee.update({
      where: { id: employeeId },
      data: { active: employee.active ? false : true },
    });
    return { message: "Access updated" };
  } catch (error) {
    return { error: "internal server error" };
  }
};

// get employee for salary managemnt

export const getEmployeesWithSalaryInfo = async () => {
  try {
    let token = cookies().get("branch_token")?.value!;
    let { id } = jwtDecode(token);
    const employees = await prisma.employee.findMany({
      where: { branchId: id },
      select: {
        fullName: true,
        position: true,
        secure_url: true,
        fixedSalary: true,
        id: true,
        salaries: true,
      },
    });
    return { employees };
  } catch (error) {
    return { error: "internal server error" };
  }
};
// get employee for salary managemnt

export const getSingleEmployeeWithSalaryInfo = async () => {
  try {
    let token = cookies().get("branch_token")?.value!;
    let { id, employeeId } = jwtDecode(token);
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      select: {
        fullName: true,
        position: true,
        secure_url: true,
        fixedSalary: true,
        id: true,
        salaries: true,
      },
    });
    return { employee };
  } catch (error) {
    return { error: "internal server error" };
  }
};

export const addSalary = async ({
  id,
  month,
  amount,
  monthIndex,
  year,
  method,
}: {
  id: string;
  month: string;
  amount: number;
  year: number;
  monthIndex: number;
  method: string;
}) => {
  try {
    await prisma.salary.create({
      data: {
        amount,
        month,
        monthIndex,
        year,
        employeeId: id,
        method,
        status: "awaiting",
      },
    });
    return { message: "recored added" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const deleteSalary = async ({ salaryId }: { salaryId: string }) => {
  try {
    await prisma.salary.delete({ where: { id: salaryId } });
    return { message: "record deleted" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
export const acceptSalary = async ({ salaryId }: { salaryId: string }) => {
  try {
    await prisma.salary.update({
      where: { id: salaryId },
      data: { status: "accepted" },
    });
    return { message: "salary accepted" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
