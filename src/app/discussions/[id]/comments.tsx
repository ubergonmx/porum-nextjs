import { CommentWithUser } from "./actions";
import CommentPost from "./comment";
import { validateRequest } from "@/lib/auth/validate-requests";
import { Button } from "@/components/ui/button";
import CommentPoster from "./comment-poster";

interface CommentsSectionProps {
  postId: string;
  comments: CommentWithUser[];
}

export default async function CommentsSection({
  postId,
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
            <CommentPoster postId={postId} user={user} />
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
