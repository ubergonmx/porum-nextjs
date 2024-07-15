"use server";

import { database } from "@/db/database";
import { Post, posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function fetchPost(postId: string) {
  console.log("[fetchPost] postId", postId);
  let post: Post | null = null;
  try {
    const foundPost = await database.query.posts.findFirst({
      where: eq(posts.id, postId),
    });

    console.log("[foundPost]", foundPost);

    if (foundPost) {
      post = foundPost;
    }
  } catch (err) {
    console.log("Error fetching post");
    if (err instanceof Error) {
      console.error(err.stack);
    }
  }
  return post;
}
