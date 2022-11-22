import React from "react";
import { useState } from "react";

export function Food({ food, setCart, disabled }) {
  const [amount, setAmount] = useState("0");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { food, amount: parseInt(amount) };

    setCart((cart) => {
      return [
        ...cart.filter((item) => item.food._id !== newItem.food._id),
        newItem,
      ];
    });
  }

  return (
    <div>
      {food.name} - ${food.price}
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={disabled}
          />{" "}
        </label>
        <button disabled={disabled}>Add to cart</button>
      </form>
      <hr />
    </div>
  );
}
