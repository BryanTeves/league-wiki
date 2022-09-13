import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components

// Pages
import ChampionPage from "./pages/ChampionPage";
import HowToUse from "./pages/HowToUse";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";

// Context
import { LeagueProvider } from "./context/LeagueContext";

function App() {
  return (
    <LeagueProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/champion/:champion" element={<ChampionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LeagueProvider>
  );
}

export default App;
