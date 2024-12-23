import { useState } from "react";
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
import { Dispatch, SetStateAction } from "react";
import { customToast } from "./ToastContainer";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordForUser } from "@/actions/auth";
import useBranchStore from "@/hooks/useBranchStore";

export function ResetPassword({
  setSelelectedPage,
}: {
  setSelelectedPage: Dispatch<
    SetStateAction<"reset" | "login" | "forgot" | "otp">
  >;
}) {
  const { forgotId } = useBranchStore();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: updatePasswordForUser,
    onSuccess: ({ error, message }) => {
      if (error) return customToast("error", error);
      if (message) customToast("success", message);
      setSelelectedPage("login");
    },
  });

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      customToast("error", "new password and confirm must be same !");
    } else {
      mutate({ id: forgotId, newPass: newPassword });
    }
  };

  return (
    <Card className="mx-auto max-w-sm rounded-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Try to make a strong password and confirm to use for login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="********"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>

            <Button disabled={isPending} type="submit" className="w-full py-6">
              Confirm
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
