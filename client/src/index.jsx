import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Homepage } from "./homepage";
import { Login } from "./login/login";
import { Navigation } from "./navigation";
import { Logout } from "./login/logout";
import { Register } from "./login/register";
import { Menu } from "./menu/menu";
import { Admin } from "./admin/admin";
import "./styles.css";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch("api/login");
      setUser((await res.json()) || {});
    })();
  }, []);

  return (
    <BrowserRouter>
      <Navigation user={user} />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/menu"} element={<Menu />} />
        <Route path={"/register"} element={<Register setUser={setUser} />} />
        <Route path={"/login"} element={<Login setUser={setUser} />} />
        <Route path={"/logout"} element={<Logout setUser={setUser} />} />
        <Route path={"/admin"} element={<Admin user={user} />} />
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
