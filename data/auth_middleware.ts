"use server";

import jwt from "jsonwebtoken";

export const jwtDecodeInMiddleware = (token: string) => {
  const data = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
    iat: number;
    role: string;
  };

  return data;
};
