import React from "react";
import { Post } from "@/db/schema";
import PostFullPage from "./post-full-page";
import { fetchCommentsAndUsers, fetchPost } from "./actions";

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

  // Fetch comments and users for the post
  const comments = await fetchCommentsAndUsers(postId as string);

  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
      <div className="w-full max-w-screen-lg">
        {post ? (
          <PostFullPage post={post} comments={comments} />
        ) : (
          <div>Post not found</div>
        )}
      </div>
    </div>
  );
}
