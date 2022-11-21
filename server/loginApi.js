import express from "express";

export function loginApi(db) {
  const api = express.Router();
  const collection = "users";

  api.get("/", (req, res) => {
    if (!req.user){
      return res.sendStatus(401)
    }

    const { username, isAdmin } = req.user;
    res.json({ username, isAdmin });
  });

  api.post("/", async (req, res) => {
    const { username, password } = req.body;

    const user = await db.collection(collection).findOne({ username });

    const body = { username: user.username, isAdmin: user.isAdmin };

    if (user && password === user?.password) {
      res.cookie("username", username, { signed: true });
      res.json(body);
    } else {
      res.sendStatus(401);
    }
  });

  api.post("/new", async (req, res) => {
    const { username, password } = req.body;

    const user = { username, password };

    if (await db.collection(collection).findOne({ username })) {
      return res.sendStatus(401);
    }

    await db.collection(collection).insertOne(user);

    res.cookie("username", username, { signed: true });
    res.json({ username });
  });

  api.delete("/", (req, res) => {
    res.clearCookie("username");

    res.sendStatus(200);
  });

  return api;
}

export function loginMiddleware(db) {
  const router = express.Router();
  const collection = "users";

  router.use(async (req, res, next) => {
    const { username } = req.signedCookies;

    req.user = await db.collection(collection).findOne({ username });

    next();
  });

  return router;
}
