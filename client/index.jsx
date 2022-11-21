import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { Homepage } from "./homepage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/test"}>Test</NavLink>
      </nav>
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/test"} element={<h2>test</h2>} />
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
