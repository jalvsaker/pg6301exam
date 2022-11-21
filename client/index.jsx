import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Homepage } from "./homepage";
import { Login } from "./login";
import { Navigation } from "./navigation";
import { Logout } from "./logout";

import "./styles.css"

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch("api/user");
      setUser(await res.json() || {});
    })();
  }, []);

  return (
    <BrowserRouter>
      <Navigation user={user} />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<Login setUser={setUser} />} />
        <Route path={"/logout"} element={<Logout setUser={setUser} />} />
        <Route path={"/*"} element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
