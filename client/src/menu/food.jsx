import { useState } from "react";

export function Food({ food, setCart }) {
  const [amount, setAmount] = useState("0");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { food, amount };

    setCart((cart) => {
      return [
        ...cart.filter((item) => item.food._id !== newItem.food._id),
        newItem,
      ];
    });
  }

  return (
    <div>
      {food.name} - {food.price}
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />{" "}
        </label>
        <button>Add to cart</button>
      </form>
      <hr />
    </div>
  );
}
