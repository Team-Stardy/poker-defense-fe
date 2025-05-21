import { Routes, Route } from 'react-router-dom';
import Main from './main';
import Room from './pages/game/Room';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/room" element={<Room />} />
    </Routes>
  );
}

export default App;