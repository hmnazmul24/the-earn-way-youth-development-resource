" use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { branchLoginAction } from "@/actions/auth";
import { customToast } from "./ToastContainer";
import { LoginRoleType } from "@/types/auth";

export function LoginForm({
  close,
  setSelelectedPage,
}: {
  close: () => void;
  setSelelectedPage: Dispatch<
    SetStateAction<"reset" | "login" | "forgot" | "otp">
  >;
}) {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginRole, setLoginRole] = useState<LoginRoleType>("branch-owner");
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: branchLoginAction,
    onSuccess: ({ error, message }) => {
      if (error) {
        return customToast("error", error);
      }
      if (message) {
        customToast("success", message);
        router.push("/branch/dashboard/analytics");
      }
    },
  });

  const HanleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password, loginRole, userName });
  };
  return (
    <Card className="mx-auto max-w-sm rounded-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={HanleSubmit}>
          {loginRole === "branch-owner" ? (
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                required
              />
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                id="userName"
                type="text"
                placeholder="enter your username"
                required
              />
            </div>
          )}
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {loginRole === "branch-owner" && (
                <h1
                  className="ml-auto inline-block text-sm cursor-pointer underline"
                  onClick={() => setSelelectedPage("forgot")}
                >
                  Forgot your password?
                </h1>
              )}
            </div>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="******"
              required
            />
          </div>
          <RadioGroup
            onValueChange={(value) => {
              if (value === "branch-owner" || value === "branch-employee") {
                setLoginRole(value);
              }
            }}
            defaultValue={loginRole}
            className="my-2 space-y-1 "
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="branch-owner"
                id="branch-owner "
                className="cursor-pointer"
              />
              <Label className="cursor-pointer" htmlFor="branch-owner">
                Brnach owner
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="cursor-pointer"
                value="branch-employee"
                id="branch-employee"
              />
              <Label className="cursor-pointer" htmlFor="branch-employee">
                Brnach Employee
              </Label>
            </div>
          </RadioGroup>

          <Button disabled={isPending} type="submit" className="w-full py-6">
            {!isPending ? "Login" : "Login..."}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link onClick={close} href="/branch-apply" className="underline">
            Apply Branch
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
