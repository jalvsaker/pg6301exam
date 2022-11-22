import React from "react";
import { createRoot } from "react-dom/client";
import { Navigation } from "../src/navigation";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { Homepage } from "../src/homepage";
import { FoodForm } from "../src/admin/foodForm";
import { AddFood } from "../src/admin/addFood";
import { ChangeFood } from "../src/admin/changeFood";
import { ChatApp } from "../src/chat/chatApp";

describe("tests", () => {
  it("should show nav menu", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    await act(() => {
      root.render(
        <MemoryRouter>
          <Navigation user={{ username: "name", isAdmin: true }} />
        </MemoryRouter>
      );
    });

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show homepage", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    await act(() => {
      root.render(
        <MemoryRouter>
          <Homepage />
        </MemoryRouter>
      );
    });

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show addFood", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    await act(() => {
      root.render(<AddFood />);
    });

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show changeFood", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    await act(() => {
      root.render(<ChangeFood />);
    });

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should submit food form", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    const mock = jest.fn();

    await act(() => {
      root.render(<FoodForm onSubmit={mock} />);
    });

    await act(() => {
      Simulate.change(element.getElementsByTagName("input")[0], {
        target: { value: "foodname" },
      });
      Simulate.change(element.getElementsByTagName("input")[1], {
        target: { value: "12" },
      });
    });

    await act(() => {
      Simulate.submit(element.querySelector("form"));
    });

    expect(element.innerHTML).toMatchSnapshot();
    expect(mock).toBeCalledWith({ name: "foodname", price: "12" });
  });

  it("should submit chat", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    const mock = jest.fn();

    await act(() => {
      root.render(<ChatApp messages={[{username: "user 1", message: "Hello"},{username: "user 2", message: "Hey"}]} onNewMessage={mock} />);
    });

    await act(() => {
      Simulate.change(element.querySelector("input"), {
        target: { value: "hei" },
      });
    });

    await act(() => {
      Simulate.submit(element.querySelector("form"));
    });

    expect(element.innerHTML).toMatchSnapshot();
    expect(mock).toBeCalledWith("hei");
  });
});
