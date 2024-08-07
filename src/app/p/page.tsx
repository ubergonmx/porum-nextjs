import { fetchPosts } from "./actions";
import PostPreview from "./post-preview";

export default async function Discussion() {
  const posts = await fetchPosts();
  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
      <div className="w-full max-w-screen-lg">
        <div className="rounded-md bg-white shadow">
          <div className="flex justify-between px-6 py-4">Discussion Board</div>
          {/* Temporary List of feeds */}
          {posts.map((post) => (
            <PostPreview post={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
