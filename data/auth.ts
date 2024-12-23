import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";
import crypto from "crypto-js";

export const setCookie = (token: string) => {
  cookies().set({
    name: "branch_token",
    value: token,
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
};

export const hashedPassword = (password: string): string => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = (
  password: string,
  hashedPass: string
): boolean => {
  return bcrypt.compareSync(password, hashedPass);
};

export const genToken = (
  id: string,
  role?: string,
  employeeId?: string
): string => {
  const token = jwt.sign({ id, role, employeeId }, process.env.JWT_SECRET!);
  return token;
};

export const jwtDecode = (token: string) => {
  const data = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
    iat: number;
    role: string;
    employeeId: string;
  };

  return data;
};

export const generateUserCredentials = async (
  name: string
): Promise<{ userName: string; password: string }> => {
  let userName: string = "";
  let isUnique = false;

  // Generate a unique username by ensuring it does not exist in the database
  while (!isUnique) {
    const userNameSuffix = Math.floor(10000 + Math.random() * 90000).toString(); // 4 digits
    userName = `${name
      .replaceAll(" ", "")
      .trim()
      .toLowerCase()}${userNameSuffix}`;

    // Check if the generated username already exists
    const existingUser = await prisma.employee.findUnique({
      where: { username: userName },
    });

    if (!existingUser) {
      isUnique = true;
    }
  }

  // Generate an 8-character random password
  const password = Math.random().toString(36).slice(2, 10);

  const encryptPass = encryptCryptoPassword(password);

  return { userName, password: encryptPass };
};

/// encrypt password

const AES_SECRET_KEY = process.env.AES_SECRET_KEY!;

function encryptCryptoPassword(password: string): string {
  return crypto.AES.encrypt(password, AES_SECRET_KEY).toString();
}

// decrypt
export const decryptCryptoPassword = (encryptedPassword: string): string => {
  const bytes = crypto.AES.decrypt(encryptedPassword, AES_SECRET_KEY);
  return bytes.toString(crypto.enc.Utf8);
};
