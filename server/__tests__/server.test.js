/*import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";*/
import { loginApi, loginMiddleware } from "../loginApi.js";
import { foodApi } from "../foodApi.js";
import { orderApi } from "../orderApi.js";

/*describe("tests", () => {
  const app = express();
  app.use(bodyParser.json);
  dotenv.config();
  const mongoClient = new MongoClient(process.env.MONGODB_URL);

  beforeAll(async () => {
    await mongoClient.connect();
    const database = mongoClient.db("unit_tests");
    app.use("/api/login", loginApi(database));
  });

  afterAll(async () => {
    await mongoClient.close();
  });

  it("should do something", async () => {
    const result = request(app).get("/api/login").expect(404).end();

    console.log(result)
  });
});*/

describe("", () => {
  it("should ", () => {
    foodApi();
    loginApi();
    loginMiddleware();
    orderApi();
  });
});
