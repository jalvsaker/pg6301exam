import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { foodApi } from "../foodApi.js";
import { loginApi, loginMiddleware } from "../loginApi.js";
import { orderApi } from "../orderApi.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("cookie-secret"));
let mongoClient;

beforeAll(async () => {
  dotenv.config();
  mongoClient = new MongoClient(globalThis.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await mongoClient.connect();
  const database = mongoClient.db(globalThis.__MONGO_DB_NAME__);

  await database
    .collection("users")
    .insertOne({ username: "admin", password: "admin", isAdmin: true });
  await database.collection("foods").insertOne({
    _id: new ObjectId("abc123abc123abc123abc123"),
    name: "test",
    price: 1,
  });

  app.use(loginMiddleware(database));
  app.use("/api/foods", foodApi(database));
  app.use("/api/login", loginApi(database));
  app.use("/api/orders", orderApi(database));
});

afterAll(() => {
  mongoClient.close();
});

describe("server test suite", () => {
  it("should get foods", async () => {
    const agent = request.agent(app);
    const response = await agent.get("/api/foods");
    await agent.put("/api/foods/hahaha");
    await agent.delete("/api/foods/hahaha");

    expect(response.status).toEqual(200);
  });

  it("should add food", async function () {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "admin", password: "admin" });
    const response = await agent.post("/api/foods");

    expect(response.status).toEqual(200);
  });

  it("should put food", async function () {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "admin", password: "admin" });
    const response = await agent.put("/api/foods/abc123abc123abc123abc123");

    expect(response.status).toEqual(200);
  });

  it("should delete food", async function () {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "admin", password: "admin" });
    const response = await agent.delete("/api/foods/abc123abc123abc123abc123");

    expect(response.status).toEqual(200);
  });

  it("should get orders", async function () {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "admin", password: "admin" });
    const response = await agent.get("/api/orders");

    expect(response.status).toEqual(200);
  });

  it("should post order", async function () {
    const agent = request.agent(app);
    await agent
      .post("/api/login")
      .send({ username: "admin", password: "admin" });
    const response = await agent.post("/api/orders").send({
      cart: [
        {
          food: {
            name: "Burger",
            price: 8.2,
          },
          amount: 1,
        },
      ],
      totalPrice: 8.2,
      time: "22:22",
    });

    expect(response.status).toEqual(200);
  });

  it("should get new user and logou", async function () {
    const agent = request.agent(app);
    const response = await agent
      .post("/api/login/new")
      .send({ username: "newuser", password: "pass123" });
    const response2 = await agent.get("/api/login");
    const response3 = await agent.delete("/api/login");

    expect(response.status).toEqual(200);
    expect(response2.status).toEqual(200);
    expect(response3.status).toEqual(200);
  });
});
