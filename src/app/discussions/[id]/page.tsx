import React from "react";
import { Post } from "@/db/schema";
import PostFullPage from "./post-full-page";
import { fetchPost } from "./actions";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const postId = params.id;

  // Fetch post data from the server
  let post: Post | null = null;
  post = await fetchPost(postId as string);

  return <>{post ? <PostFullPage post={post} /> : <div>Post not found</div>}</>;
}
