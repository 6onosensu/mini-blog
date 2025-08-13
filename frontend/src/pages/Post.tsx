import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: any;
  coverImage?: string;
  tags?: string[];
}

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  if (!post) return <p className="text-center mt-10">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white mt-6 rounded-lg shadow">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="mb-4 w-full h-60 object-cover rounded"
        />
      )}

      <h1 className="text-3xl font-bold text-blue-700 mb-4">{post.title}</h1>

      <div className="mt-6 text-sm text-gray-600">
        Tags: {post.tags?.join(", ") || "none"}
      </div>
    </div>
  );
};

export default Post;
