import { redirect } from "next/navigation";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const studentId = url.searchParams.get("transId");
  redirect(`${process.env.BASE_URL}/branch/payment/fail/${studentId}`);
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const studentId = url.searchParams.get("transId");
  redirect(`${process.env.BASE_URL}/branch/payment/fail/${studentId}`);
}
