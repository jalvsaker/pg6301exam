import { useEffect, useState } from "react";
import { ChatApp } from "./chatApp";

export function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://" + window.location.host);
    ws.onmessage = (event) => {
      const { username, message } = JSON.parse(event.data);
      setMessages((messages) => [...messages, { username, message }]);
    };
    setWs(ws);
  }, []);

  function handleNewMessage(message) {
    ws.send(JSON.stringify({ message, username: user.username }));
  }

  return <ChatApp messages={messages} onNewMessage={handleNewMessage} />;
}
