import { useEffect, useState } from "react";
import { Food } from "./food";
import { Cart } from "./cart";

export function Menu({ user }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);

  function order() {
    alert(JSON.stringify(cart, null, 2));
  }

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/foods");
      if (res.ok) {
        setFoods(await res.json());
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Menu</h1>
      {!user.username && <h4>Log in to order</h4>}
      <Cart cart={cart} order={order} disabled={!user.username} />
      {foods.map((food) => (
        <Food food={food} key={food._id} setCart={setCart} />
      ))}
    </>
  );
}
