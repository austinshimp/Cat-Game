import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { CatGuide } from "./pages/CatGuide";
import { CatDetail } from "./pages/CatDetail";
import { Quiz } from "./pages/Quiz";
import { Leaderboard } from "./pages/Leaderboard";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<CatGuide />} />
          <Route path="/guide/:id" element={<CatDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
