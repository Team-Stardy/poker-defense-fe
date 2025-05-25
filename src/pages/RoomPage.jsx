import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000"; // 실제 서버 URL로 변경 필요

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [players, setPlayers] = useState([]);
  const socketRef = useRef();
  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    if (!nickname) {
      navigate("/");
      return;
    }

    // 소켓 연결
    socketRef.current = io(SOCKET_SERVER_URL);

    // 방 입장
    socketRef.current.emit("joinRoom", { roomId, nickname });

    // 메시지 수신
    socketRef.current.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // 플레이어 목록 업데이트
    socketRef.current.on("players", (players) => {
      setPlayers(players);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, nickname, navigate]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socketRef.current.emit("message", {
        roomId,
        nickname,
        text: message,
      });
      setMessage("");
    }
  };

  const handleLeaveRoom = () => {
    navigate("/lobby");
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">게임방 {roomId}</h1>
        <button
          onClick={handleLeaveRoom}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          나가기
        </button>
      </div>

      <div className="flex flex-1 gap-4">
        {/* 플레이어 목록 */}
        <div className="w-1/4 border rounded p-4">
          <h2 className="text-xl font-semibold mb-4">참가자</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index} className="mb-2">
                {player}
              </li>
            ))}
          </ul>
        </div>

        {/* 채팅 영역 */}
        <div className="flex-1 border rounded p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.nickname === nickname ? "text-right" : "text-left"
                }`}
              >
                <span className="font-semibold">{msg.nickname}: </span>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              className="flex-1 border rounded px-2 py-1"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
