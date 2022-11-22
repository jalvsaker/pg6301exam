import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function ShowOrders({user}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/orders");

      setOrders(await res.json());
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return "Loading...";
  }

  return <>
    <h2>Orders:</h2>
    <Link to={"/admin"}>&lt;-Back</Link>
    {orders.map((order) => <div key={order._id}>
      <h4>Order by user {order.username} to be delivered at {order.time}</h4>
      <h5>Total price: {order.totalPrice.toFixed(2)}</h5>
      <ul>
        {order.cart.map((item) => <li key={item.name} >{item.amount} {item.name} {item.price}</li>)}
      </ul>
      <hr/>
    </div>)}
  </>;
}
