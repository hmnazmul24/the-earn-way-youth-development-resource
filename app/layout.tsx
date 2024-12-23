import type { Metadata } from "next";
import { Inconsolata, Salsa } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import ReactQuery from "@/components/data/ReactQuery";
import { Suspense } from "react";

const incons = Inconsolata({ subsets: ["latin"], variable: "--font-incons" });
const salsa = Salsa({
  subsets: ["latin"],
  variable: "--font-salsa",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "The Earn Way Youth Development Resource",
  description: "to empower the the youth is the primary duity of our institute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-incons text-lg min-h-screen antialiased",
          incons.variable,
          salsa.variable
        )}
      >
        <ReactQuery>{children}</ReactQuery>
        <Toaster />
      </body>
    </html>
  );
}
