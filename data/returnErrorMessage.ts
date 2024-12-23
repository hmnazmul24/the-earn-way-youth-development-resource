import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const returnErrorMessage = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return { error: "Unique constraint failed." };
      case "P2003":
        return { error: "Foreign key constraint failed." };
      case "P2011":
        return { error: "Null constraint violation." };
      case "P2025":
        return { error: "Record to delete does not exist." };
      default:
        return { error: "An unexpected error occurred." };
    }
  }
  return { error: "Internal server error." };
};
