import { APP_TITLE, Paths } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { validateRequest } from "@/lib/auth/validate-request";
import { UserAvatar } from "@/components/user-avatar";
import { SignOutItem } from "./sign-out-item";
import { Suspense } from "react";
import { HeaderActionsFallback } from "./header-actions-fallback";

export default async function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="container mx-auto flex h-full max-w-7xl flex-col items-center justify-between gap-2 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            className="size-8 rounded"
            width="50"
            height="50"
            src="/icon.png"
            alt="hero image"
          />
          <span className="sr-only">{APP_TITLE}</span>
        </Link>
        <SearchBar />
        <Suspense fallback={<HeaderActionsFallback />}>
          <HeaderActions />
        </Suspense>
      </nav>
    </header>
  );

  async function SearchBar() {
    const { user } = await validateRequest();
    const isSignedIn = !!user;

    if (!isSignedIn) return null;

    return (
      <form className="ml-auto flex-1 sm:flex-initial">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>
    );
  }
}

async function HeaderActions() {
  const { user } = await validateRequest();
  const isSignedIn = !!user;

  return (
    <>
      {isSignedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              {/* <CircleUser className="size-5" /> */}
              <UserAvatar user={user} />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <SignOutItem />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href={Paths.Login}>Log in</Link>
        </Button>
      )}
    </>
  );
}
