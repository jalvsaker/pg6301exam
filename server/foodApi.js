import express from "express";
import { ObjectId } from "mongodb";

export function foodApi(db) {
  const api = express.Router();
  const collection = "foods";

  api.get("/", async (req, res) => {
    const foods = await db.collection(collection).find({}).toArray();

    res.json(foods);
  });

  api.post("/", async (req, res) => {
    if (!req.user?.isAdmin) {
      return res.sendStatus(401);
    }

    const result = await db.collection(collection).insertOne(req.body);

    console.log(result);
    res.sendStatus(200);
  });

  api.put("/:id", async (req, res) => {
    if (!req.user?.isAdmin) {
      return res.sendStatus(401);
    }

    const id = req.params.id;

    const result = await db
      .collection(collection)
      .replaceOne({ _id: new ObjectId(id) }, req.body);

    if (result.modifiedCount >= 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  });

  api.put("/:id", async (req, res) => {
    if (!req.user?.isAdmin) {
      return res.sendStatus(401);
    }

    const id = req.params.id;

    const result = await db
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount >= 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  });

  return api;
}
