import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import React from "react";
import { Menu } from "../src/menu/menu";
import { MemoryRouter } from "react-router-dom";
import { Food } from "../src/menu/food";

describe("menu test", function() {
  it("should show menu", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    global.fetch = jest.fn(() => {
      return {
        ok: true,
        json: () => {
          return [];
        },
      };
    });

    await act(() => {
      root.render(
        <MemoryRouter>
        <Menu user={{username: "hei"}}/>
        </MemoryRouter>
      );
    });

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show Food", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    const mock = jest.fn()

    await act(() => {
      root.render(
        <Food food={{name: "banana", price: 1}} setCart={mock}/>
      );
    });

    await act(() => {
      Simulate.change(element.querySelector("input"), {target: {value: "2"}})
    })

    await act(() => {
      Simulate.submit(element.querySelector("form"))
    })

    expect(element.innerHTML).toMatchSnapshot();
    expect(mock).toHaveBeenCalled()
  });
});