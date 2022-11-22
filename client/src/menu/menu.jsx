import { useEffect, useState } from "react";
import { Food } from "./food";
import { Cart } from "./cart";
import { useNavigate } from "react-router-dom";

export function Menu({ user }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  async function order({ totalPrice, time }) {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, totalPrice, time }),
    });

    if (res.ok) {
      navigate("/");
    }
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
      {foods.map((food) => (
        <Food
          food={food}
          key={food._id}
          setCart={setCart}
          disabled={!user.username}
        />
      ))}
      <Cart cart={cart} order={order} disabled={!user.username} />
    </>
  );
}
