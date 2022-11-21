import express from "express";
import * as path from "path";

const app = express();

app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET") {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
