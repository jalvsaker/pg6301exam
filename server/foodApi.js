import express from "express";

export function foodApi(db) {
  const api = express.Router();

  api.get("/", async (req, res) => {
    const foods = await db.collection("foods").find({}).toArray();

    res.json(foods);
  });

  return api;
}
