import { Link } from "react-router-dom";

const mockPosts = [
  {
    id: 1,
    title: "Building a Blog with React & NestJS",
    preview: "Learn how to build a fullstack blog using modern tools like NestJS, TypeORM, and React.",
    tags: ["react", "nestjs", "fullstack"],
  },
  {
    id: 2,
    title: "Why TypeScript is Awesome",
    preview: "Let's explore some real-world benefits of using TypeScript in both frontend and backend projects.",
    tags: ["typescript", "productivity"],
  },
];

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5"
          >
            <Link to={`/post/${post.id}`}>
              <h2 className="text-xl font-semibold text-blue-700 hover:underline">{post.title}</h2>
            </Link>
            <p className="text-gray-600 text-sm mt-2">{post.preview}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
