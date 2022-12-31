import React from "react";
import { useRef, useState } from "react";
import { ChatApp } from "./chatApp";

export function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  if (ws.current === null) {
    ws.current = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    ws.current.onmessage = (event) => {
      const { username, message } = JSON.parse(event.data);
      setMessages((messages) => [...messages, { username, message }]);
    };
  }

  function handleNewMessage(message) {
    ws.current.send(JSON.stringify({ message, username: user.username }));
  }

  return <ChatApp messages={messages} onNewMessage={handleNewMessage} />;
}
