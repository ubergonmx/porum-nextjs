import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth/validate-request";
import { VerifyCode } from "./verify-code";
import { Paths } from "@/lib/constants";

export const metadata = {
  title: "Verify Email",
  description: "Verify Email Page",
};

export default async function VerifyEmailPage() {
  const { user } = await validateRequest();

  if (!user) redirect(Paths.Login);
  if (user.emailVerified) redirect(Paths.Home);

  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>
            Verification code was sent to <strong>{user.email}</strong>. Check
            your spam folder if you can&apos;t find the email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyCode />
        </CardContent>
      </Card>
    </div>
  );
}
