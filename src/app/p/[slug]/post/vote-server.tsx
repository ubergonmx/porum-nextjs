"use server";

import PostVoteClient from "./vote-client";

interface PostVoteServerProps {
  postId: string;
  initialVotesAmt: number;
  initialUserVote: number;
}

export default async function PostVoteServer({
  postId,
  initialVotesAmt,
  initialUserVote,
}: PostVoteServerProps) {
  return (
    <PostVoteClient
      postId={postId}
      initialVotesAmt={initialVotesAmt}
      initialUserVote={initialUserVote}
    />
  );
}
