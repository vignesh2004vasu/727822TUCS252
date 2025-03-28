import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Social Media</h1>

      <div className="flex flex-col gap-4">
        <Link
          to="/feed"
          className="bg-blue-500 text-white px-8 py-3 rounded-lg text-center hover:bg-blue-600"
        >
          Feed
        </Link>

        <Link
          to="/trending"
          className="bg-blue-500 text-white px-8 py-3 rounded-lg text-center hover:bg-blue-600"
        >
          Trending Posts
        </Link>

        <Link
          to="/top-users"
          className="bg-blue-500 text-white px-8 py-3 rounded-lg text-center hover:bg-blue-600"
        >
          Top Users
        </Link>
      </div>
    </div>
  );
};

export default Home;
