import React from "react";
import { createRoot } from "react-dom/client";
import { Navigation } from "../src/navigation";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { Homepage } from "../src/homepage";

describe("tests", () => {
  it("should show nav menu logged in admin", async () => {
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

  it("should show nav menu logged in", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    await act(() => {
      root.render(
        <MemoryRouter>
          <Navigation user={{ username: "name"}} />
        </MemoryRouter>
      );
    });

    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should show nav menu no user", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    await act(() => {
      root.render(
        <MemoryRouter>
          <Navigation user={{}} />
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
});
