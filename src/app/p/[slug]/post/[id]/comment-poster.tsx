"use client";

import React, { useState } from "react";
import { createComment } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";

interface CommentPosterProps {
  postId: string;
  user: any;
}

export default function CommentPoster({ postId, user }: CommentPosterProps) {
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const values = {
        userId: user.id,
        postId,
        content: message,
      };

      await createComment(values);
      // Refresh the page to show the new comment
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmitComment}
      className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        value={message}
        onChange={handleInputChange}
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
