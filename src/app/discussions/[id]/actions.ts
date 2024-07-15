"use server";

import { database } from "@/db/database";
import { Post } from "@/db/schema";

export async function fetchPost(postId: string) {
  let post: Post | null = null;
  try {
    const foundPost = await database.query.posts.findFirst({
      with: {
        id: postId,
      },
    });

    if (foundPost) {
      post = foundPost;
      post.id = postId;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.stack);
    }
  }
  return post;
}
