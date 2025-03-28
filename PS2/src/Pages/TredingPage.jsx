import { useState, useEffect } from "react";

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8080/api/posts?type=popular"
        );
        if (!response.ok) throw new Error("Failed to fetch trending posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError("Failed to load trending posts");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return <div className="max-w-4xl mx-auto p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Trending Posts 🔥</h1>
        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1 rounded-full">
          Popular Posts
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userName}`}
                    alt={post.userName}
                    className="w-12 h-12 rounded-full border-2 border-purple-500"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {post.userName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    User ID: {post.userid}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{post.content}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Post ID: #{post.id}</span>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  </svg>
                  Popular
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;
