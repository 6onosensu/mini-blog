import { useParams } from "react-router-dom";

const mockPost = {
  id: 1,
  title: "Building a Blog with React & NestJS",
  content: `This is a detailed post explaining how to build a fullstack blog using React, NestJS, PostgreSQL, and Tailwind CSS.`,
  tags: ["react", "nestjs", "fullstack"],
};

const Post = () => {
  const { id } = useParams();

  // Normally you'd fetch post by ID here
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white mt-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{mockPost.title}</h1>
      <div className="text-sm text-gray-500 mb-4">Post ID: {id}</div>
      <p className="text-gray-800 leading-relaxed whitespace-pre-line">{mockPost.content}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {mockPost.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Post;
