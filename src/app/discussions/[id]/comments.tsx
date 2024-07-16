import React from "react";
import { CommentWithUser } from "./actions";
import CommentPost from "./comment";
import { validateRequest } from "@/lib/auth/validate-requests";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CornerDownLeft } from "lucide-react";

interface CommentsSectionProps {
  comments: CommentWithUser[];
}

export default async function CommentsSection({
  comments,
}: CommentsSectionProps) {
  const { user } = await validateRequest();
  return (
    <div className="mt-4 flex flex-col gap-y-4 pb-4 pl-4">
      <hr className="my-6 h-px w-full" />

      {/* Create comment editor goes here */}
      <div className="flex flex-col px-4">
        {user ? (
          // User can post comments

          <div>
            <h4 className="text-lg font-semibold">Leave a comment</h4>
            <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        ) : (
          // User must be logged in to post comments
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">
              You must be logged in to post a comment
            </p>
            <Button className="mt-4" variant="default">
              Log In
            </Button>
          </div>
        )}
      </div>

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
