import { useState } from "react";

export function ChatApp({ messages, onNewMessage }) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onNewMessage(message);
    setMessage("");
  }

  return (
    <>
      <h1>Chat</h1>
      <hr />
      {messages.map(({ message, username }, index) => (
        <div key={index}>
          <strong>{username}</strong> - {message}
          <hr />
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus={true}
        />
        <button>Send</button>
      </form>
    </>
  );
}
