"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";
import cn from "classnames";

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialUserVote: number;
}

export default function PostVoteClient({
  postId,
  initialVotesAmt,
  initialUserVote,
}: PostVoteClientProps) {
  const [votesAmt] = useState(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialUserVote);

  // Ensure sync with server
  useEffect(() => {
    setCurrentVote(initialUserVote);
  }, [initialUserVote]);

  return (
    <div className="flex flex-col gap-4 pb-4 pr-6 sm:w-20 sm:gap-0 sm:pb-0">
      {/* upvote */}
      <Button
        // onClick={() => vote("UP")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === 1,
          })}
        />
      </Button>

      {/* score */}
      <p className="py-2 text-center text-sm font-medium text-zinc-900">
        {votesAmt}
      </p>

      {/* downvote */}
      <Button
        // onClick={() => vote("DOWN")}
        size="sm"
        className={cn({
          "text-emerald-500": currentVote === "DOWN",
        })}
        variant="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "text-red-500 fill-red-500": currentVote === "DOWN",
          })}
        />
      </Button>
    </div>
  );
}
