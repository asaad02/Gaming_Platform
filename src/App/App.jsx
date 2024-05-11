import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar.jsx";
import { LandingPage } from "../LandingPage/LandingPage.jsx";
import { About } from "../About/About.jsx";
import { MatchingGame } from "../MatchingGame/MatchingGame.jsx";
import { PoolGame } from "../PoolGame/PoolGame.jsx";
import { GameSelector } from "../Leaderboard/GameSelector/GameSelector.jsx";
import WinScreen from "../WinScreen/WinScreen.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import { AKLMMSJLDAHA } from "../AKLMMSJLDAHA/AKLMMSJLDAHA.jsx";
export function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="matchingGame" element={<MatchingGame />} />
          <Route path="poolgame" element={<PoolGame />} />
          <Route path="/win/:token" element={<WinScreen />} />
          <Route path="leaderboard" element={<GameSelector />} />
          <Route path="AKLMMSJLDAHA" element={<AKLMMSJLDAHA />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
