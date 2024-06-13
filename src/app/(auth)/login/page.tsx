import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth/validate-requests";
import { APP_TITLE, Paths } from "@/lib/constants";
import { redirect } from "next/navigation";
import LogInForm from "./loginform";

export default async function SignUp() {
  const { user } = await validateRequest();

  if (user) {
    if (user.role === "admin") {
      return redirect(Paths.AdminDashboard);
    } else {
      return redirect(Paths.Home);
    }
  }

  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{APP_TITLE} Log in</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
        </CardHeader>
        <CardContent>
          <LogInForm />
        </CardContent>
      </Card>
    </div>
  );
}
