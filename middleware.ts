import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const SECURE_BRANCH_URLS = [
  "/branch/employee-management",
  "/branch/salary-management",
];
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("branch_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  const { role: branchRole } = JSON.parse(atob(token.split(".")[1])) as {
    id: string;
    role: string;
  };

  if (branchRole) {
    if (SECURE_BRANCH_URLS.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(
        new URL("/branch/dashboard/analytics", req.url)
      );
    }
  }
}

export const config = {
  matcher: ["/admin/:path*", "/branch/:path*"],
};
