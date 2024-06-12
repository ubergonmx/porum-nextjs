import SignUpForm from "./signupform";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_TITLE } from "@/lib/constants";

export default async function SignUp() {
  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
      {/* <a
        href="#"
        className="mb-8 flex items-center justify-center text-2xl font-semibold dark:text-white lg:mb-10"
      >
        <img src="/vercel.svg" className="mr-4 h-11" />
      </a>
      <div className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create a Free Account
        </h2>
        <SignUpForm />
      </div> */}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{APP_TITLE} Sign Up</CardTitle>
          <CardDescription>Sign up to start using the app</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
