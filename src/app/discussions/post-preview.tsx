import { Post } from "@/db/schema";

interface PostPreviewProps {
  post: Post;
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

export default function PostPreview({ post }: PostPreviewProps) {
  return (
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
          {/* Shortened post content */}
          {post.content && post.content.length > 200 ? (
            <p>{post.content.slice(0, 200)}...</p>
          ) : (
            <p>{post.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
