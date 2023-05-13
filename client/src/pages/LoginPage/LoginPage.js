import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      // Handle successful login here (e.g., redirect to another page)
      console.log(response.data);
    } catch (error) {
      // Handle login error here
      setError("Invalid username or password");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
