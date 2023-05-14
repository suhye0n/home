import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
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

      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비번"
          value={password1}
          onChange={e => setPassword1(e.target.value)}
        />
        <input
          type="password"
          placeholder="비번 한 번 더"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;
