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

    await db.collection(collection).insertOne(req.body);

    res.sendStatus(200);
  });

  return api;
}
