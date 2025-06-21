import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

const NicknamePage = () => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요");
      return;
    }

    if (nickname.trim().length < 2) {
      setError("닉네임은 2자 이상 입력해주세요");
      return;
    }

    if (nickname.trim().length > 10) {
      setError("닉네임은 10자 이하로 입력해주세요");
      return;
    }

    localStorage.setItem("nickname", nickname.trim());
    navigate("/lobby");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">🎮</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              포커 디펜스
            </h1>
            <p className="text-gray-600">
              게임을 시작하기 위해 닉네임을 입력해주세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="닉네임"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요 (2-10자)"
              error={error}
              maxLength={10}
              autoFocus
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              게임 시작하기
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              닉네임은 게임 내에서 다른 플레이어들에게 표시됩니다
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NicknamePage;
