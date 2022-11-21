import { useState } from "react";

export function Cart({ cart, order, disabled }) {
  const [time, setTime] = useState("");

  const prices = cart.map((i) => i.amount * i.food.price);
  const totalPrice = prices.reduce((sum, i) => (sum += i), 0);

  function handleClick() {
    order({ totalPrice, time });
  }

  return (
    <>
      <h3>Cart:</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.food._id}>
            {item.amount}x {item.food.name} - {item.food.price}
          </li>
        ))}
      </ul>
      <div>Price: {totalPrice.toFixed(2)}</div>
      <input
        type="time"
        disabled={disabled}
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={handleClick} disabled={disabled}>
        Order
      </button>
      <hr />
    </>
  );
}
