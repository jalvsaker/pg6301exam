import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import { foodApi } from "./foodApi.js";

dotenv.config();
const app = express();

const mongodbUrl = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DATABASE;

if (mongodbUrl) {
  const client = new MongoClient(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  await client.connect();
  app.use("/api/foods", foodApi(client.db(dbName)));
}

app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
