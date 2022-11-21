export function Cart({ cart, order, disabled }) {
  const prices = cart.map((i) => i.amount * i.food.price);
  const totalPrice = prices.reduce((sum, i) => (sum += i), 0);

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
      <button onClick={order} disabled={disabled}>
        Order
      </button>
      <hr />
    </>
  );
}
