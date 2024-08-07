import React from "react";
import { Post } from "@/db/schema";
import { CommentWithUser } from "./actions";
import CommentsSection from "./comments";

interface PostFullPageProps {
  post: Post;
  comments: CommentWithUser[];
}

function formatTimeToNow(date: Date) {
  const diff = new Date().getTime() - date.getTime();
  const seconds = diff / 1000;
  if (seconds < 60) {
    return `${Math.floor(seconds)}s`;
  }
  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)}m`;
  }
  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}h`;
  }
  const days = hours / 24;
  return `${Math.floor(days)}d`;
}

const PostFullPage: React.FC<PostFullPageProps> = ({ post, comments }) => {
  return (
    <div className="rounded-md bg-white shadow">
      <div className="flex justify-between px-6 py-4">
        {/* Vote client goes here */}

        <div className="w-0 flex-1">
          <div className="mt-1 max-h-40 text-xs text-gray-500">
            {/* Username and date */}
            <span>Posted by u/{post.username} </span>
            {post.createdAt && formatTimeToNow(post.createdAt)}
            {/* {subredditName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/r/${subredditName}`}
                >
                  r/{subredditName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.username}</span>{" "}
            {formatTimeToNow(new Date(post.createdAt))} */}
          </div>
          <a href={`/discussions/${post.id}`}>
            <h1 className="py-2 text-lg font-semibold leading-6 text-gray-900">
              {post.title}
            </h1>
          </a>

          <div className="relative max-h-40 w-full text-clip text-sm">
            {/* <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null} */}

            {post.content}
          </div>
        </div>
      </div>
      {/* Comments will go here */}
      <CommentsSection postId={post.id} comments={comments} />
    </div>
  );
};

export default PostFullPage;
