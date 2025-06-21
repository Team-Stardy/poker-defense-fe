import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

const SOCKET_SERVER_URL = "http://localhost:3000"; // 실제 서버 URL로 변경 필요

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [players, setPlayers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [gameState, setGameState] = useState({
    isStarted: false,
    isHost: false,
    currentRound: 0,
    timeLeft: 0,
    difficulty: "normal",
  });
  const socketRef = useRef();
  const messagesEndRef = useRef();
  const nickname = localStorage.getItem("nickname");
  const maxPlayers = 8; // 최대 8인

  useEffect(() => {
    if (!nickname) {
      navigate("/");
      return;
    }

    // 소켓 연결
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on("connect", () => {
      setIsConnected(true);
      // 방 입장
      socketRef.current.emit("joinRoom", { roomId, nickname });
    });

    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
    });

    // 메시지 수신
    socketRef.current.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // 플레이어 목록 업데이트
    socketRef.current.on("players", (players) => {
      setPlayers(players);
    });

    // 게임 상태 업데이트
    socketRef.current.on("gameState", (state) => {
      setGameState(state);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, nickname, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      socketRef.current.emit("message", {
        roomId,
        nickname,
        text: message,
      });
      setMessage("");
    }
  };

  const handleLeaveRoom = () => {
    if (socketRef.current) {
      socketRef.current.emit("leaveRoom", { roomId, nickname });
    }
    navigate("/lobby");
  };

  const handleStartGame = () => {
    if (socketRef.current && gameState.isHost) {
      socketRef.current.emit("startGame", { roomId });
    }
  };

  const handleSetDifficulty = (difficulty) => {
    if (socketRef.current && gameState.isHost) {
      socketRef.current.emit("setDifficulty", { roomId, difficulty });
    }
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatGameTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "normal":
        return "text-green-600 bg-green-50 border-green-200";
      case "hard":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "hell":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case "normal":
        return "일반";
      case "hard":
        return "어려움";
      case "hell":
        return "지옥";
      default:
        return "미설정";
    }
  };

  if (!nickname) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-6 h-screen flex flex-col">
        {/* 헤더 */}
        <Card className="p-6 mb-6 flex-shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">#{roomId}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  게임방 {roomId}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isConnected ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {isConnected ? "연결됨" : "연결 중..."}
                    </span>
                  </div>
                  {gameState.isStarted && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        라운드 {gameState.currentRound}
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {formatGameTime(gameState.timeLeft)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {gameState.isHost && !gameState.isStarted && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">난이도:</span>
                  <div className="flex gap-1">
                    {["normal", "hard", "hell"].map((diff) => (
                      <button
                        key={diff}
                        onClick={() => handleSetDifficulty(diff)}
                        className={`px-2 py-1 text-xs rounded border transition-colors ${
                          gameState.difficulty === diff
                            ? getDifficultyColor(diff)
                            : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {getDifficultyText(diff)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {gameState.isHost && !gameState.isStarted && (
                <Button onClick={handleStartGame} variant="success" size="md">
                  🎮 게임 시작
                </Button>
              )}
              <Button onClick={handleLeaveRoom} variant="danger" size="lg">
                🚪 나가기
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex flex-1 gap-6 min-h-0">
          {/* 플레이어 목록 및 게임 정보 */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="space-y-6">
              {/* 플레이어 목록 */}
              <Card className="p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-6 flex-shrink-0">
                  <span className="text-2xl">👥</span>
                  <h2 className="text-xl font-bold text-gray-900">참가자</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {players.length}/{maxPlayers}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border flex-shrink-0 ${
                        player.nickname === nickname
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {player.nickname.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">
                            {player.nickname}
                            {player.nickname === nickname && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                나
                              </span>
                            )}
                          </p>
                          {player.isHost && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              방장
                            </span>
                          )}
                        </div>
                        {gameState.isStarted && (
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                            <span>💰 {player.gold || 10}</span>
                            <span>❤️ {player.life || 30}</span>
                            <span>⚔️ {player.kills || 0}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* 빈 자리 표시 */}
                  {[...Array(maxPlayers - players.length)].map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 flex-shrink-0"
                    >
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">+</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-400">빈 자리</p>
                        <p className="text-xs text-gray-400">대기 중</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 게임 정보 (게임 시작 후 표시) */}
              {gameState.isStarted && (
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🎮</span>
                    <h3 className="text-lg font-bold text-gray-900">
                      게임 정보
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">난이도</span>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded border ${getDifficultyColor(
                          gameState.difficulty
                        )}`}
                      >
                        {getDifficultyText(gameState.difficulty)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">현재 라운드</span>
                      <span className="text-sm font-bold text-blue-600">
                        {gameState.currentRound}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">남은 시간</span>
                      <span className="text-sm font-bold text-red-600">
                        {formatGameTime(gameState.timeLeft)}
                      </span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* 채팅 영역 */}
          <div className="flex-1 flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col p-6">
              <div className="flex items-center gap-2 mb-6 flex-shrink-0">
                <span className="text-2xl">💬</span>
                <h2 className="text-xl font-bold text-gray-900">채팅</h2>
              </div>

              {/* 메시지 목록 */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-2 block">💭</span>
                    <p>첫 번째 메시지를 보내보세요!</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.nickname === nickname
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.nickname === nickname
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {msg.nickname}
                          </span>
                          <span className="text-xs opacity-70">
                            {formatTime()}
                          </span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* 메시지 입력 */}
              <form onSubmit={sendMessage} className="flex gap-3 flex-shrink-0">
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1"
                  disabled={!isConnected}
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!message.trim() || !isConnected}
                >
                  전송
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
