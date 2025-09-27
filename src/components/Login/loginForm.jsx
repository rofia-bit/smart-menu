import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Fill all fields");
    onLogin({ username, password });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Choose a username"
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />

      <div className="auth-actions">
        <button type="submit" className="primary-btn">Login</button>
        <button
          type="button"
          className="secondary-btn"
          onClick={() => alert("Sign up not implemented yet")}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
