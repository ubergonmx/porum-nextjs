import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { validateRequest } from "@/lib/auth/validate-requests";
import { APP_TITLE } from "@/lib/constants";
import Link from "next/link";
import { logout } from "./_header/actions";
import { SubmitButton } from "@/components/submit-button";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const { user } = await validateRequest();

  const avatarURL = user ? `/avatars/${user.avatar}` : "/avatars/default.png";

  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{APP_TITLE}</CardTitle>
          <CardDescription>Dive into anything.</CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="flex flex-col items-center gap-2">
              <Image
                src={avatarURL}
                alt="avatar"
                width={64}
                height={64}
                className="size-20 rounded-full object-cover"
              />
              <p className="text-center text-sm text-muted-foreground">
                You&apos;re all set!
              </p>
              <Button variant="outline" className="w-full" disabled>
                Go to discussions
              </Button>
              <form action={logout} className="w-full">
                <SubmitButton className="w-full">Log Out</SubmitButton>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href={"/login"}>Log In</Link>
              </Button>
              <div>
                <Link href={"/signup"}>
                  <span className="float-end p-0 text-xs font-medium underline-offset-4 hover:underline">
                    Don&apos;t have an account yet? Sign up instead.
                  </span>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
