import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
export async function POST(request: Request) {
  const url = new URL(request.url);
  const transId = url.searchParams.get("transId") as string;

  try {
    let branch = await prisma.branch.findFirst({ where: { transId } });
    await prisma.branch.update({
      where: {
        id: branch?.id!,
      },
      data: {
        isOneTimePaid: true,
      },
    });
    redirect(
      `${process.env.BASE_URL}/branch/payment/branch/success?status=success`
    );
  } catch (error) {
    redirect(`${process.env.BASE_URL}/branch/dashboard/analytics`);
  }
}
