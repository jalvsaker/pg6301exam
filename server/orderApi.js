import express from "express";

export function orderApi(db) {
  const api = express.Router();

  const collection = "orders";

  api.get("/", async (req, res) => {
    if (!req.user?.isAdmin) {
      return res.sendStatus(401);
    }

    const orders = await db.collection(collection).find({}).toArray();

    res.json(orders);
  });

  api.post("/", async (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const { cart, totalPrice, time } = req.body;

    const newCart = cart.map((i) => {
      return { name: i.food.name, price: i.food.price, amount: i.amount };
    });

    const order = {
      username: req.user.username,
      totalPrice,
      time,
      cart: newCart,
    };

    await db.collection(collection).insertOne(order);

    res.sendStatus(200);
  });

  return api;
}
