"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { SubmitButton } from "@/components/submit-button";
import { PasswordInput } from "@/components/password-input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "./actions";

export function ResetPassword({ token }: { token: string }) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(resetPassword, null);

  useEffect(() => {
    if (state?.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state?.error]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div className="space-y-2">
        <Label>New Password</Label>
        <PasswordInput
          name="password"
          required
          autoComplete="new-password"
          placeholder="********"
        />
      </div>
      <SubmitButton className="w-full">Reset Password</SubmitButton>
    </form>
  );
}
