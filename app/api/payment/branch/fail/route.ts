import { redirect } from "next/navigation";
export async function POST(request: Request) {
  redirect(`${process.env.BASE_URL}/branch/payment/branch/success?status=fail`);
}
