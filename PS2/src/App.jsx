import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TopUsers from "./Pages/TopPage";
import TrendingPosts from "./Pages/TredingPage";
import Feed from "./Pages/FeedPage";
import Home from "./Pages/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="bg-blue-500 p-4">
          <div className="flex justify-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link to="/feed" className="text-white hover:text-gray-200">
              Feed
            </Link>
            <Link to="/trending" className="text-white hover:text-gray-200">
              Trending
            </Link>
            <Link to="/top-users" className="text-white hover:text-gray-200">
              Top Users
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<TrendingPosts />} />
          <Route path="/top-users" element={<TopUsers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
