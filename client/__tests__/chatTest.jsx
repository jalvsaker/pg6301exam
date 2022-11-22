import React from "react";
import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { ChatApp } from "../src/chat/chatApp";

describe("chat tests", function () {
  it("should submit chat", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    const mock = jest.fn();

    await act(() => {
      root.render(
        <ChatApp
          messages={[
            { username: "user 1", message: "Hello" },
            { username: "user 2", message: "Hey" },
          ]}
          onNewMessage={mock}
        />
      );
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
