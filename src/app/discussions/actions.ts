"use server";
import { database } from "@/db/database";

export async function fetchPosts() {
  const posts = await database.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });

  return posts;
}
