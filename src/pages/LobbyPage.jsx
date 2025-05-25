import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LobbyPage = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: "게임방 1", players: 2 },
    { id: 2, name: "게임방 2", players: 1 },
    { id: 3, name: "게임방 3", players: 3 },
  ]);
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    if (!nickname) {
      navigate("/");
    }
  }, [nickname, navigate]);

  const handleJoinRoom = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const handleCreateRoom = () => {
    const newRoom = {
      id: rooms.length + 1,
      name: `게임방 ${rooms.length + 1}`,
      players: 1,
    };
    setRooms([...rooms, newRoom]);
    navigate(`/room/${newRoom.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">게임 로비</h1>
        <div className="flex items-center gap-4">
          <span>환영합니다, {nickname}님!</span>
          <button
            onClick={handleCreateRoom}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            방 만들기
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border p-4 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => handleJoinRoom(room.id)}
          >
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <p>참가자: {room.players}/4</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LobbyPage;
