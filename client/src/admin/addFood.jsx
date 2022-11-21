import { useState } from "react";

export function AddFood({ reload }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const body = { name, price };

    await fetch("/api/foods", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type={"number"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
}
