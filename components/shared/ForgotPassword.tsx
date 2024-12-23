import { forgotPasswordAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBranchStore from "@/hooks/useBranchStore";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { customToast } from "./ToastContainer";

export function ForgotPassword({
  setSelelectedPage,
}: {
  setSelelectedPage: Dispatch<
    SetStateAction<"reset" | "login" | "forgot" | "otp">
  >;
}) {
  const { forgotEamil, setForgotEamil } = useBranchStore();

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordAction,
    onSuccess: ({ error, message }) => {
      if (error) return customToast("error", error);
      if (message) customToast("success", message);
      setSelelectedPage("otp");
    },
  });

  const hanldeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(forgotEamil);
  };
  return (
    <Card className="mx-auto max-w-sm rounded-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below to get OTP. after submitting the OTP you could
          add a new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={hanldeSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={forgotEamil}
              onChange={(e) => setForgotEamil(e.target.value)}
              placeholder="m@example.com"
              required
            />
          </div>

          <Button disabled={isPending} type="submit" className="w-full py-6">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
