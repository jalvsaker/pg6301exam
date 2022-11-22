import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { Logout } from "../src/login/logout";
import React from "react";
import { Login } from "../src/login/login";
import { Register } from "../src/login/register";


describe("login test", function() {
  it("should show logout", async () => {
    global.fetch = jest.fn(() => {
      return {
        ok: false,
        json: () => {
          return {};
        },
      };
    });

    const element = document.createElement("div");
    const root = createRoot(element);

    const mock = jest.fn()

    await act(() => {
      root.render(
        <MemoryRouter>
          <Logout setUser={mock}/>
        </MemoryRouter>
      );
    });

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should submit login", async () => {
    global.fetch = jest.fn(() => {
      return {
        ok: true,
        json: () => {
          return {};
        },
      };
    });
    window.alert = jest.fn();

    const element = document.createElement("div");
    const root = createRoot(element);

    const mock = jest.fn();

    await act(() => {
      root.render(
        <MemoryRouter><Login setUser={mock}/></MemoryRouter>
      );
    });

    await act(() => {
      Simulate.change(element.querySelectorAll("input")[0], {
        target: { value: "username" },
      });
      Simulate.change(element.querySelectorAll("input")[1], {
        target: { value: "password" },
      });
    });

    await act(() => {
      Simulate.submit(element.querySelector("form"));
    });

    expect(element.innerHTML).toMatchSnapshot();
    expect(global.fetch).toBeCalled();
  });

  it("should fail to submit login", async () => {
    global.fetch = jest.fn(() => {
      return {
        ok: false,
        json: () => {
          return {};
        },
      };
    });
    window.alert = jest.fn();

    const element = document.createElement("div");
    const root = createRoot(element);

    const mock = jest.fn();

    await act(() => {
      root.render(
        <MemoryRouter><Login setUser={mock}/></MemoryRouter>
      );
    });

    await act(() => {
      Simulate.change(element.querySelectorAll("input")[0], {
        target: { value: "username" },
      });
      Simulate.change(element.querySelectorAll("input")[1], {
        target: { value: "password" },
      });
    });

    await act(() => {
      Simulate.submit(element.querySelector("form"));
    });

    expect(element.innerHTML).toMatchSnapshot();
    expect(global.fetch).toBeCalled();
    expect(window.alert).toBeCalled();
  });

  it("should submit register", async () => {
    global.fetch = jest.fn(() => {
      return {
        ok: true,
        json: () => {
          return {};
        },
      };
    });
    window.alert = jest.fn();

    const element = document.createElement("div");
    const root = createRoot(element);

    const mock = jest.fn();

    await act(() => {
      root.render(
        <MemoryRouter><Register setUser={mock}/></MemoryRouter>
      );
    });

    await act(() => {
      Simulate.change(element.querySelectorAll("input")[0], {
        target: { value: "username" },
      });
      Simulate.change(element.querySelectorAll("input")[1], {
        target: { value: "password" },
      });
    });

    await act(() => {
      Simulate.submit(element.querySelector("form"));
    });

    expect(element.innerHTML).toMatchSnapshot();
    expect(global.fetch).toBeCalled();
  });
  it("should fail to submit register", async () => {
    global.fetch = jest.fn(() => {
      return {
        ok: false,
        json: () => {
          return {};
        },
      };
    });
    window.alert = jest.fn();

    const element = document.createElement("div");
    const root = createRoot(element);

    const mock = jest.fn();

    await act(() => {
      root.render(
        <MemoryRouter><Register setUser={mock}/></MemoryRouter>
      );
    });

    await act(() => {
      Simulate.change(element.querySelectorAll("input")[0], {
        target: { value: "username" },
      });
      Simulate.change(element.querySelectorAll("input")[1], {
        target: { value: "password" },
      });
    });

    await act(() => {
      Simulate.submit(element.querySelector("form"));
    });

    expect(element.innerHTML).toMatchSnapshot();
    expect(global.fetch).toBeCalled();
    expect(window.alert).toBeCalled();
  });
});