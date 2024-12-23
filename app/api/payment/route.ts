import { redirect } from "next/navigation";
export async function POST(request: Request) {
  const url = new URL(request.url);
  const transId = url.searchParams.get("transId");
  const amount = url.searchParams.get("amount");

  redirect(
    `${process.env.BASE_URL}/branch/payment/success?amount=${amount}&transId=${transId}`
  );
}
