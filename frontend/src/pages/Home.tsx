import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getPosts } from '../api/posts';

interface Post {
  id: number;
  title: string;
  content: any;
  coverImage?: string;
  tags?: string[];
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => console.error('Error loading posts:', err));
  }, []);
  return (

    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5"
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="mb-2 w-full h-48 object-cover rounded"
              />
            )}
            <Link to={`/post/${post.id}`}>
              <h2 className="text-xl font-semibold text-blue-700 hover:underline">{post.title}</h2>
            </Link>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="text-sm text-gray-600">
                Tags: {post.tags?.join(', ') || 'none'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
