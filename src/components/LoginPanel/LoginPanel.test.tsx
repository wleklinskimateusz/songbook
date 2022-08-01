// Write unit tests for your component "LoginPanel"

import React from "react";
import { render, screen } from "@testing-library/react";
import { LoginPanel } from "./LoginPanel";

describe("LoginPanel", () => {
  it("should render", () => {
    render(<LoginPanel user={null} />);
    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });
});
