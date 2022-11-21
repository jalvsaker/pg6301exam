import express from "express";

const app = express();

app.use(express.static("../client/dist"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
