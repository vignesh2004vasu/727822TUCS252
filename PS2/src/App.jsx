import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import TopUsers from "./components/TopUsers";
import TrendingPosts from "./components/TrendingPosts";
import Feed from "./components/Feed";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Navigation Buttons */}
      <nav className="w-full bg-white shadow-md p-4 sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <Link
              to="/"
              className={`px-6 py-3 rounded-lg font-medium transition-colors text-center min-w-[120px] ${
                location.pathname === "/"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Feed
            </Link>
            <Link
              to="/trending"
              className={`px-6 py-3 rounded-lg font-medium transition-colors text-center min-w-[120px] ${
                location.pathname === "/trending"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Trending Posts
            </Link>
            <Link
              to="/top-users"
              className={`px-6 py-3 rounded-lg font-medium transition-colors text-center min-w-[120px] ${
                location.pathname === "/top-users"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Top Users
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/trending" element={<TrendingPosts />} />
            <Route path="/top-users" element={<TopUsers />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

// Wrap App with Router and handle location
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
