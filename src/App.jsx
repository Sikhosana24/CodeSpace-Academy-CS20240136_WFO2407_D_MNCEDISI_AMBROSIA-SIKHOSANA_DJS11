import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AudioProvider } from "./contexts/AudioContext"
import { FavoritesProvider } from "./contexts/FavoritesContext"
import Home from "./pages/Home"
import ShowDetail from "./pages/ShowDetail"
import Favorites from "./pages/Favorites"
import Settings from "./pages/Settings"
import { AudioPlayer } from "./components/AudioPlayer"
import { MetaTags } from "./components/MetaTags"
import { Navigation } from "./components/Navigation"
import "./App.css"

function App() {
  return (
    <AudioProvider>
      <FavoritesProvider>
        <Router>
          <MetaTags />
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shows/:id" element={<ShowDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <AudioPlayer />
        </Router>
      </FavoritesProvider>
    </AudioProvider>
  )
}

export default App
