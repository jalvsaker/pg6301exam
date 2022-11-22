import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (res.ok) {
      setUser(await res.json());
      navigate("/");
    } else {
      alert(`${res.status} ${res.statusText}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in:</h1>
      <div>
        <label>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button>Log in</button>
    </form>
  );
}
