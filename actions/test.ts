"use server";

import { decryptCryptoPassword } from "@/data/auth";

export const testAction = async () => {
  try {
    let password = decryptCryptoPassword(
      "U2FsdGVkX1/GlrvedzhjhyX7clTOVav8UvnC+J9sSEA="
    );

    return { message: "New employee created" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
