"use client";

import { UserAvatar } from "@/components/user-avatar";
import { Comment } from "@/db/schema";
import { CommentUser } from "./actions";
import CommentActions from "./comment-actions";

interface CommentProps {
  comment: Comment;
  commentUser: CommentUser;
  isOwner: boolean;
  replyable?: boolean;
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

export default function CommentPost({
  comment,
  commentUser,
  isOwner,
  replyable = true,
}: CommentProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: commentUser.username,
            image: commentUser.avatar,
          }}
          className="size-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{commentUser.username}
          </p>

          <p className="max-h-40 truncate text-xs text-zinc-500">
            {comment.createdAt && formatTimeToNow(comment.createdAt)}
          </p>
        </div>
        {comment.deleted === "false" && (
          <div className="ml-auto mr-4 flex items-center gap-2">
            <CommentActions
              comment={comment}
              isOwner={isOwner}
              replyable={replyable}
            />
          </div>
        )}
      </div>

      <p className="mt-2 text-sm text-zinc-900">{comment.content}</p>

      <div className="flex items-center gap-2">
        {/* <CommentVotes
          commentId={comment.id}
          votesAmt={votesAmt}
          currentVote={currentVote}
        />

        <Button
          onClick={() => {
            if (!session) return router.push("/sign-in");
            setIsReplying(true);
          }}
          variant="ghost"
          size="xs"
        >
          <MessageSquare className="mr-1.5 size-4" />
          Reply
        </Button> */}
      </div>

      {/* {isReplying ? (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="comment">Your comment</Label>
          <div className="mt-2">
            <Textarea
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              autoFocus
              id="comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="What are your thoughts?"
            />

            <div className="mt-2 flex justify-end gap-2">
              <Button
                tabIndex={-1}
                variant="subtle"
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                onClick={() => {
                  if (!input) return;
                  postComment({
                    postId,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id, // default to top-level comment
                  });
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      ) : null} */}
    </div>
  );
}
