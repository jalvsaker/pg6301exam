import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { loginApi } from "../loginApi.js";

let app;
let mongoClient;

/*beforeAll(async () => {
  app = express();
  app.use(bodyParser.json);
  dotenv.config();
  mongoClient = new MongoClient(process.env.MONGODB_URL);
  await mongoClient.connect();
  const database = mongoClient.db("unit_tests");
  app.use("/api/login", loginApi(database));
});

afterAll(() => {
  mongoClient.close();
  app.stop()
});*/

describe("tests", () => {
  it("should do something", async () => {
    /*const agent = request.agent(app);
    const response = await agent.get("/api/login");

    expect(response.status).toEqual(200)*/
  });
});
