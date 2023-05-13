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

      // User registration successful
      console.log(response.data);
    } catch (error) {
      // User registration failed
      console.error(error);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password1}
          onChange={e => setPassword1(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
