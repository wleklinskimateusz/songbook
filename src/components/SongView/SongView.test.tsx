import React from "react";
import { render, screen } from "@testing-library/react";
import { SongView } from "./SongView";
import { AlertStatus } from "../../types";

test("should pass", () => {
  render(
    <SongView
      song={{ title: "A Song", artist: "Me", filename: "abc.txt" }}
      setAlert={function (status: AlertStatus): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
  const helloElement = screen.getByText("Hello, Hello");
  expect(helloElement).toBeInTheDocument();
});
