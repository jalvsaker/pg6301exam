import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/login", { method: "delete" });
      if (res.ok) {
        setUser({});
        navigate("/");
      }
    })();
  }, []);

  return "Logging out...";
}