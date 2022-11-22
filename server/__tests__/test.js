/*
import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { loginApi } from "../loginApi.js";

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

describe("tests", () => {
  it("should do something", async () => {
    const agent = request.agent(app);
    const response = await agent.get("/api/login");

    expect(response.status).toEqual(200);
  });
});
*/

import { foodApi } from "../foodApi.js";
import { loginApi, loginMiddleware } from "../loginApi.js";
import { orderApi } from "../orderApi.js";

describe("", function() {
  it("should ", function() {
    foodApi()
    loginApi()
    loginMiddleware()
    orderApi()
  });
});