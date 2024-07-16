import { Button } from "@/components/ui/button";
import { Edit, Flag, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteComment, editComment } from "./actions";
import { Comment } from "@/db/schema";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface CommentActionsProps {
  comment: Comment;
  isOwner: boolean;
}

export default function CommentActions({
  comment,
  isOwner,
}: CommentActionsProps) {
  const [newComment, setNewComment] = useState<string>(comment.content);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleDelete = async () => {
    await deleteComment(comment.id);
  };

  const handleEdit = async () => {
    if (newComment === comment.content) return;
    await editComment(comment.id, newComment);
  };

  return (
    <>
      {/* Edit and Delete Buttons that show only if owned by user */}
      {isOwner ? (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Edit className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h2>Edit comment</h2>
                <DialogDescription>Update your comment here.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Textarea
                  id="edit-comment"
                  placeholder="Type your message here..."
                  value={newComment}
                  onChange={handleInputChange}
                  className="min-h-12 resize-none  border-black p-3 shadow-none"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" onClick={handleEdit}>
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Trash className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h2>Delete comment?</h2>
                <DialogDescription>
                  Are you sure you want to delete this comment? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleDelete}>Delete</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        // Report button that shows only if not owned by user
        <Button variant="ghost" size="sm">
          <Flag className="size-4" />
        </Button>
      )}
    </>
  );
}
