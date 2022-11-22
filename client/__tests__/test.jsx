import React from "react";
import { createRoot } from "react-dom/client";
import { Navigation } from "../src/navigation";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { Homepage } from "../src/homepage";
import { FoodForm } from "../src/admin/foodForm";

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

  it("should submit food form", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    const mock = jest.fn();

    await act(() => {
      root.render(<FoodForm onSubmit={mock}/>);
    });

    await act(()=>{
      Simulate.change(element.getElementsByTagName("input")[0], {
        target: { value: "foodname" },
      });
      Simulate.change(element.getElementsByTagName("input")[1], {
        target: { value: "12" },
      });

    })

    act(()=>{
      Simulate.submit(element.querySelector("form"));
    })

    expect(element.innerHTML).toMatchSnapshot();
    expect(mock).toBeCalledWith({name: "foodname", price: "12"})
  });
});
