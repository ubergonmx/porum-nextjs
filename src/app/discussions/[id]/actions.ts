"use server";

import { database } from "@/db/database";
import { Post, posts, users, Comment, comments } from "@/db/schema";
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
