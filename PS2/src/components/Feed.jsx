import { useState, useEffect } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8080/api/posts?type=latest"
        );
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest Posts</h1>
      <div className="grid gap-6 max-w-7xl mx-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userName}`}
                  alt={post.userName}
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {post.userName}
                  </p>
                  <p className="text-sm text-gray-500">
                    User ID: {post.userid}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-lg">{post.content}</p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <span>Post ID: #{post.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
