import React, { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async e => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/signup/", {
        username,
        password1,
        password2,
      });

      // 회원가입 성공 시 처리할 로직 작성
      console.log(response.data);
    } catch (error) {
      // 회원가입 실패 시 처리할 로직 작성
      console.error(error);
      setError("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="사용자명"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password1}
          onChange={e => setPassword1(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;
