"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { verifyEmail, resendVerificationEmail as resendEmail } from "./actions";
import { logout } from "@/app/_header/actions";
import { SubmitButton } from "@/components/submit-button";

export const VerifyCode = () => {
  const { toast } = useToast();
  const [verifyEmailState, verifyEmailAction] = useFormState(verifyEmail, null);
  const [resendState, resendAction] = useFormState(resendEmail, null);
  const codeFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (resendState?.success) {
      toast({
        title: "Code resent",
        description: "Check your email for the verification code.",
      });
    }
    if (resendState?.error) {
      toast({
        title: "Error",
        description: resendState.error,
        variant: "destructive",
      });
    }
  }, [resendState?.error, resendState?.success]);

  useEffect(() => {
    if (verifyEmailState?.error) {
      toast({
        title: "Error",
        description: verifyEmailState.error,
        variant: "destructive",
      });
    }
  }, [verifyEmailState?.error]);

  return (
    <div className="flex flex-col gap-2">
      <form ref={codeFormRef} action={verifyEmailAction}>
        <Label htmlFor="code">Verification code</Label>
        <Input className="mt-2" type="text" id="code" name="code" required />
        <SubmitButton className="mt-4 w-full">Verify</SubmitButton>
      </form>
      <form action={resendAction}>
        <SubmitButton className="w-full" variant="secondary">
          Resend Code
        </SubmitButton>
      </form>
      <form action={logout}>
        <SubmitButton variant="link" className="p-0 font-normal">
          Want to use another email? Log out now.
        </SubmitButton>
      </form>
    </div>
  );
};
