import React from "react";
import { render, screen } from "@testing-library/react";
import { List, ListItemProps } from "./List";

test("should pass", () => {
  const items: ListItemProps[] = [
    {
      id: "0",
      title: "Hello, Hello",
      artist: "Me",
      rating: 5,
    },
  ];
  render(<List data={items} onSelect={() => {}} />);
  const helloElement = screen.getByText("Hello, Hello");
  expect(helloElement).toBeInTheDocument();
});
