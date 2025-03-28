import { useState, useEffect } from "react";

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data.slice(0, 5)); 
      } catch (error) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 fixed w-full">
        <div className="max-w-4xl mx-auto p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 fixed w-full">
        <div className="max-w-4xl mx-auto p-4 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 fixed w-full overflow-auto">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Top Users</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div
              key={user.id || index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.userName}`}
                    alt={user.userName}
                    className="h-24 w-24 rounded-full border-4 border-blue-500"
                  />
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    #{index + 1}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {user.userName}
                </h2>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <span className="font-medium">
                    {user.postCount || 0} posts
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  User ID: {user.name || "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUsers;
