"use server";

import { database } from "@/db/database";
import { User } from "@/db/schema";

export async function fetchUsers() {
  try {
    const userResults: User[] = await database.query.users.findMany();
    return userResults;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.stack);
    }
  }
  return [];
}
