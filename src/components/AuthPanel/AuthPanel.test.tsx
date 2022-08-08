import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthPanel } from "./AuthPanel";

describe("AuthPanel", () => {
  const setup = () => {
    render(<AuthPanel />);
    const createAccountLink = screen.getByText("Create an account");
    return { createAccountLink };
  };
  it("render component correctly", async () => {
    const { createAccountLink } = setup();
    expect(createAccountLink).toBeInTheDocument();
  });

  it("switch to create account form and go back", async () => {
    const { createAccountLink } = setup();
    createAccountLink.click();
    const signUpButton = await screen.findByText("Sign Up");
    expect(signUpButton).toBeInTheDocument();
    const alreadyHaveAccountLink = await screen.findByText(
      "I already have an account"
    );
    alreadyHaveAccountLink.click();
    const loginButton = await screen.findByText("Log In");
    expect(loginButton).toBeInTheDocument();
  });
});
