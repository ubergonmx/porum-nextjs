"use server";

import { database } from "@/db/database";
import { Post, posts, users, Comment, comments } from "@/db/schema";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq, inArray } from "drizzle-orm";

export async function fetchPost(postId: string) {
  console.log("[fetchPost] postId", postId);
  let post: Post | null = null;
  try {
    const foundPost = await database.query.posts.findFirst({
      where: eq(posts.id, postId),
    });

    console.log("[foundPost]", foundPost);

    if (foundPost) {
      post = foundPost;
    }
  } catch (err) {
    console.log("Error fetching post");
    if (err instanceof Error) {
      console.error(err.stack);
    }
  }
  return post;
}

export interface CommentUser {
  id: string;
  username: string;
  avatar: string;
}

export interface CommentWithUser extends Comment {
  user: CommentUser;
}

/**
 * Finds users and comments for a given post. Comments are fetched first, then users.
 * The collected userIds are used to fetch the users and only grab the necessary fields.
 * @param postId
 */
export async function fetchCommentsAndUsers(postId: string) {
  console.log("[fetchCommentsAndUsers] postId", postId);
  let foundComments: Comment[] = [];
  let commentUsers: CommentUser[] = [];
  let commentsWithUsers: CommentWithUser[] = [];

  try {
    foundComments = (await database.query.comments.findMany({
      where: eq(comments.postId, postId),
      orderBy: (comments, { asc }) => [asc(comments.createdAt)],
    })) as Comment[];

    console.log("[comments]", foundComments.length);

    if (!foundComments.length) {
      return [];
    }

    const userIds = foundComments.map((comment) => comment.userId);
    console.log("[userIds]", userIds);

    commentUsers = (await database.query.users.findMany({
      columns: {
        id: true,
        username: true,
        avatar: true,
      },
      where: inArray(users.id, userIds),
    })) as CommentUser[];

    console.log("[commentUsers]", commentUsers.length);

    commentsWithUsers = foundComments.map((comment) => {
      const user = commentUsers.find((u) => u.id === comment.userId);
      return {
        ...comment,
        user,
      };
    }) as CommentWithUser[];

    console.log("[commentsWithUsers]", commentsWithUsers.length);

    return commentsWithUsers;
  } catch (err) {
    console.log("Error fetching comments and users");
    if (err instanceof Error) {
      console.error(err.stack);
    }
  }
}

export interface CommentInput {
  userId: string;
  postId: string;
  content: string;
  replyId?: string;
}

export async function createComment(values: CommentInput) {
  console.log("[createComment] comment", values);
  try {
    const newComment = await database.insert(comments).values({
      userId: values.userId,
      postId: values.postId,
      content: values.content,
      replyToId: values.replyId,
    });
    console.log("[newComment]", newComment);

    return newComment;
  } catch (err) {
    console.log("Error creating comment");
    if (err instanceof Error) {
      console.error(err.stack);
    }
  }
}

/**
 * This deletes a comment by setting the `deleted` field to `true`.
 * and wiping out the content so that it stays in the database but is not shown.
 * @param commentId
 */
export async function deleteComment(commentId: string) {
  try {
    const deletedComment = await database
      .update(comments)
      .set({
        deleted: "true",
        content: "[Deleted]",
      })
      .where(eq(comments.id, commentId));

    console.log("[deletedComment]", deletedComment);
    return deletedComment;
  } catch (err) {
    console.log("Error deleting comment");
    if (err instanceof Error) {
      console.error(err.stack);
    }
  }
  return null;
}

export async function editComment(commentId: string, newContent: string) {
  try {
    const editedComment = await database
      .update(comments)
      .set({
        content: newContent,
      })
      .where(eq(comments.id, commentId));

    console.log("[editedComment]", editedComment);
    return editedComment;
  } catch (err) {
    console.log("Error editing comment");
    if (err instanceof Error) {
      console.error(err.stack);
    }
  }
  return null;
}

export async function createReply(
  postId: string,
  commentId: string,
  reply: string,
) {
  console.log(
    "[createReply] postId, commentId, reply",
    postId,
    commentId,
    reply,
  );
  // First validate user's session
  const { user } = await validateRequest();
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const newReply = await createComment({
      userId: user.id,
      postId,
      content: reply,
      replyId: commentId,
    });

    console.log("[newReply]", newReply);
    return newReply;
  } catch (err) {
    console.log("Error creating reply");
    if (err instanceof Error) {
      console.error(err.stack);
    }
  }
  return null;
}
