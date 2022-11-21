import { useState } from "react";

export function FoodForm({ onSubmit, food, buttonText, resetAfter }) {
  const [name, setName] = useState(food?.name || "");
  const [price, setPrice] = useState(food?.price || "");

  async function handleSubmit(e) {
    e.preventDefault();

    const body = { name, price };

    await onSubmit(body);

    if (resetAfter) {
      setName("");
      setPrice("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input
            type={"number"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      </div>
      <button>{buttonText}</button>
    </form>
  );
}
