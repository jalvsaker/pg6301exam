import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return <h1>Hei verden</h1>;
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
