import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TopUsers from "./Pages/TopPage";
import TrendingPosts from "./Pages/TredingPage";
import Feed from "./Pages/FeedPage";
import Home from "./Pages/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/trending" element={<TrendingPosts />} />
              <Route path="/top-users" element={<TopUsers />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;
