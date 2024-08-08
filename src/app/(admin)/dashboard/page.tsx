import Link from "next/link";
import { CircleUser, Home, Menu, Package2, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import UserTable from "@/app/(admin)/dashboard/user-table";
import { fetchUsers } from "./actions";
import { User } from "@/db/schema";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { user } = await validateRequest();

  if (user) {
    if (user.role !== "admin") {
      console.log("User is not an admin");
      return redirect(Paths.Home);
    }
  } else {
    console.log("User is not logged in");
    return redirect(Paths.Login);
  }

  // This loads the user database from postgres drizzle-orm
  // uses server actions to get the data using actions.ts
  const users: User[] = await fetchUsers();

  return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <UserTable users={users} />
        </main>
  );
}
