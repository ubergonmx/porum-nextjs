import React from "react";
import { CommentWithUser } from "./actions";
import CommentPost from "./comment";

interface CommentsSectionProps {
  comments: CommentWithUser[];
}

export default function CommentsSection({ comments }: CommentsSectionProps) {
  return (
    <div className="mt-4 flex flex-col gap-y-4 pb-4 pl-4">
      <hr className="my-6 h-px w-full" />

      {/* Create comment editor goes here */}

      <div className="mt-4 flex flex-col gap-y-6">
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment) => {
            return (
              <div key={topLevelComment.id} className="flex flex-col">
                <div className="mb-2">
                  <CommentPost
                    comment={topLevelComment}
                    commentUser={topLevelComment.user}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
