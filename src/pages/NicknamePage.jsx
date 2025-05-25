import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NicknamePage = () => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      localStorage.setItem("nickname", nickname);
      navigate("/lobby");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">닉네임 설정</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            className="border p-2 rounded w-full mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            입장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default NicknamePage;
