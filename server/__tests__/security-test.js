import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import request from "supertest";
import { foodApi } from "../foodApi.js";
import { orderApi } from "../orderApi.js";
import { loginApi } from "../loginApi.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("cookie-secret"));
const mock = jest.fn();
app.use("/api/login", loginApi(mock));
app.use("/api/foods", foodApi(mock));
app.use("/api/orders", orderApi(mock));

describe("security test", () => {
  it("should not post food", async () => {
    const agent = request.agent(app);
    const response = await agent.post("/api/foods");

    expect(response.status).toEqual(401);
  });

  it("should not put food", async () => {
    const agent = request.agent(app);
    const response = await agent.put("/api/foods/some-id");

    expect(response.status).toEqual(401);
  });

  it("should not delete food", async () => {
    const agent = request.agent(app);
    const response = await agent.delete("/api/foods/some-id");

    expect(response.status).toEqual(401);
  });

  it("should not get orders", async () => {
    const agent = request.agent(app);
    const response = await agent.get("/api/orders");

    expect(response.status).toEqual(401);
  });

  it("should not post order", async () => {
    const agent = request.agent(app);
    const response = await agent.post("/api/orders");

    expect(response.status).toEqual(401);
  });
});
