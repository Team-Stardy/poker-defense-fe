import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NicknamePage from "./pages/NicknamePage";
import LobbyPage from "./pages/LobbyPage";
import RoomPage from "./pages/RoomPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NicknamePage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
