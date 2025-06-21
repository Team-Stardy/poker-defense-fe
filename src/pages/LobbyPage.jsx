import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

const LobbyPage = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: "게임방 1", players: 3, status: "waiting", maxPlayers: 8 },
    { id: 2, name: "게임방 2", players: 1, status: "waiting", maxPlayers: 8 },
    { id: 3, name: "게임방 3", players: 5, status: "playing", maxPlayers: 8 },
    { id: 4, name: "게임방 4", players: 8, status: "full", maxPlayers: 8 },
    { id: 5, name: "게임방 5", players: 2, status: "waiting", maxPlayers: 8 },
    { id: 6, name: "게임방 6", players: 1, status: "waiting", maxPlayers: 8 },
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
      status: "waiting",
      maxPlayers: 8,
    };
    setRooms([...rooms, newRoom]);
    navigate(`/room/${newRoom.id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "playing":
        return "text-red-600 bg-red-50 border-red-200";
      case "full":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "playing":
        return "게임 중";
      case "full":
        return "만원";
      default:
        return "대기 중";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "playing":
        return "🎮";
      case "full":
        return "🔒";
      default:
        return "⏳";
    }
  };

  const isRoomJoinable = (room) => {
    return room.status === "waiting" && room.players < room.maxPlayers;
  };

  if (!nickname) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-6">
        {/* 헤더 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                게임 로비
              </h1>
              <p className="text-gray-600">
                원하는 방을 선택하거나 새로운 방을 만들어보세요
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">환영합니다</p>
                <p className="font-semibold text-gray-900">{nickname}님</p>
              </div>
              <Button onClick={handleCreateRoom} variant="success" size="lg">
                ✨ 방 만들기
              </Button>
            </div>
          </div>
        </div>

        {/* 방 목록 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <Card
              key={room.id}
              hover={isRoomJoinable(room)}
              onClick={() => isRoomJoinable(room) && handleJoinRoom(room.id)}
              className={`p-6 transition-all duration-200 ${
                !isRoomJoinable(room) ? "opacity-75" : ""
              }`}
            >
              {/* 방 헤더 */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      #{room.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">방 번호</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    room.status
                  )}`}
                >
                  <span className="mr-1">{getStatusIcon(room.status)}</span>
                  {getStatusText(room.status)}
                </div>
              </div>

              {/* 플레이어 정보 */}
              <div className="space-y-4">
                {/* 플레이어 아바타 그리드 (4x2) */}
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(room.maxPlayers)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        index < room.players
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 border-white shadow-md"
                          : "bg-gray-100 border-gray-200"
                      }`}
                    >
                      {index < room.players ? (
                        <span className="text-white text-xs font-bold">
                          {index + 1}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">+</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* 플레이어 수 표시 */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">참가자</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {room.players}/{room.maxPlayers}
                  </span>
                </div>

                {/* 진행률 바 */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(room.players / room.maxPlayers) * 100}%`,
                    }}
                  ></div>
                </div>

                {/* 입장 버튼 */}
                <Button
                  variant={isRoomJoinable(room) ? "primary" : "secondary"}
                  size="sm"
                  className="w-full"
                  disabled={!isRoomJoinable(room)}
                >
                  {!isRoomJoinable(room)
                    ? room.status === "playing"
                      ? "게임 중"
                      : "만원"
                    : "입장하기"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* 빈 상태 */}
        {rooms.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              아직 방이 없습니다
            </h3>
            <p className="text-gray-600 mb-6">첫 번째 방을 만들어보세요!</p>
            <Button onClick={handleCreateRoom} variant="primary">
              방 만들기
            </Button>
          </Card>
        )}

        {/* 방 통계 */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {rooms.length}
              </div>
              <div className="text-sm text-gray-600">전체 방</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {rooms.filter((r) => r.status === "waiting").length}
              </div>
              <div className="text-sm text-gray-600">대기 중</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {rooms.filter((r) => r.status === "playing").length}
              </div>
              <div className="text-sm text-gray-600">게임 중</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {rooms.reduce((sum, room) => sum + room.players, 0)}
              </div>
              <div className="text-sm text-gray-600">총 플레이어</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
