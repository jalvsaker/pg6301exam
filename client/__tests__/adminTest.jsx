import React from "react";
import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { AddFood } from "../src/admin/addFood";
import { ChangeFood } from "../src/admin/changeFood";
import { MemoryRouter } from "react-router-dom";
import { Admin } from "../src/admin/admin";
import { FoodForm } from "../src/admin/foodForm";
import { ShowOrders } from "../src/admin/showOrders";

describe("admin tests", function () {
  it("should show addFood", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    global.fetch = jest.fn(() => {
      return {
        ok: false,
        json: () => {
          return [];
        },
      };
    });

    const mock = jest.fn()

    await act(() => {
      root.render(<AddFood reload={mock} />);
    });

    await act(()=> {
      Simulate.submit(element.querySelector("form"))
    })

    expect(element.innerHTML).toMatchSnapshot();
    expect(global.fetch).toHaveBeenCalled();
  });

  it("should show changeFood", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    global.fetch = jest.fn(() => {
      return {
        ok: false,
        json: () => {
          return [];
        },
      };
    });

    const mock = jest.fn()

    await act(() => {
      root.render(<ChangeFood food={{_id: 1}} reload={mock}/>);
    });

    await act(()=> {
      Simulate.submit(element.querySelector("form"))
    })

    await act(() => {
      Simulate.click(element.querySelectorAll("button")[1])
    })

    expect(element.innerHTML).toMatchSnapshot();
    expect(global.fetch).toHaveBeenCalled();
  });

  it("should show Admin panel", async () => {
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
          <Admin user={{ isAdmin: true }} />
        </MemoryRouter>
      );
    });

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show not show Admin panel because user is not admin", async () => {
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
          <Admin user={{ isAdmin: false }} />
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

  it("should show orders", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    global.fetch = jest.fn(() => {
      return {
        ok: true,
        json: () => {
          return [
            {
              "_id": "1",
              "username": "hei",
              "totalPrice": 41,
              "time": "12:32",
              "cart": [
                {
                  "name": "Burgers",
                  "price": "8.2",
                  "amount": "5"
                }
              ]
            },
            {
              "_id": "2",
              "username": "hallo",
              "totalPrice": 42.6,
              "time": "12:59",
              "cart": [
                {
                  "name": "Burgers",
                  "price": "8.2",
                  "amount": 3
                },
                {
                  "name": "Pizza",
                  "price": "6",
                  "amount": 3
                }
              ]
            }
          ];
        },
      };
    });

    await act(() => {
      root.render(<MemoryRouter><ShowOrders user={{ isAdmin: true }} /></MemoryRouter>);
    });

    expect(element.innerHTML).toMatchSnapshot();
  });
});
