import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { otpVarifyAction } from "@/actions/auth";
import { customToast } from "./ToastContainer";
import useBranchStore from "@/hooks/useBranchStore";

export function OtpPage({
  setSelelectedPage,
}: {
  setSelelectedPage: Dispatch<
    SetStateAction<"reset" | "login" | "forgot" | "otp">
  >;
}) {
  const { setForgotId, forgotEamil } = useBranchStore();
  let [otp, setOtp] = useState<number>(0);

  const { mutate, isPending } = useMutation({
    mutationFn: otpVarifyAction,
    onSuccess: ({ error, message, id }) => {
      if (error) return customToast("error", error);
      if (message) customToast("success", message);
      setForgotId(id!);
      setSelelectedPage("reset");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email: forgotEamil, otp });
  };

  return (
    <Card className="mx-auto max-w-sm rounded-sm">
      <CardHeader>
        <CardTitle className="text-2xl">OTP Varification</CardTitle>
        <CardDescription>
          Enter your email below to get OTP. after submitting the OTP you could
          add a new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onChange={(value) => setOtp(Number(value))}
          >
            <InputOTPGroup className="flex items-center w-full justify-between">
              <InputOTPSlot className="p-7 font-bold text-3xl" index={0} />
              <InputOTPSlot className="p-7 font-bold text-3xl" index={1} />
              <InputOTPSlot className="p-7 font-bold text-3xl" index={2} />
              <InputOTPSlot className="p-7 font-bold text-3xl" index={3} />
              <InputOTPSlot className="p-7 font-bold text-3xl" index={4} />
            </InputOTPGroup>
          </InputOTP>

          <Button disabled={isPending} type="submit" className="w-full py-6">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
