import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthPanel } from "./AuthPanel";

test("LoginPanel", () => {
  render(<AuthPanel />);
  const loginButton = screen.getByText("Login");
  expect(loginButton).toBeInTheDocument();
});
