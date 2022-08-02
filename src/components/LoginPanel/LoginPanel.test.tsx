import React from "react";
import { render, screen } from "@testing-library/react";
import { LoginPanel } from "./LoginPanel";

test("LoginPanel", () => {
  render(<LoginPanel user={null} />);
  const loginButton = screen.getByText("Login");
  expect(loginButton).toBeInTheDocument();
});
