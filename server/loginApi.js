import express from "express";

export function loginApi(db) {
  const api = express.Router();
  const collection = "users";

  api.post("/", async (req, res) => {
    const { username, password } = req.body;

    const user = await db.collection(collection).findOne({ username });

    console.log(username, password);

    if (user && password === user?.password) {
      res.cookie("username", username, { signed: true });
      res.json({ username });
    } else {
      res.sendStatus(401);
    }
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
