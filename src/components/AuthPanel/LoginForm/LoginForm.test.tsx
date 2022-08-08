import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  const setup = () => {
    render(<LoginForm setError={() => {}} />);
    const emailField = screen.getByPlaceholderText(/type your email/i);
    const passwordField = screen.getByPlaceholderText(/type your password/i);
    const loginButton = screen.getByText("Log In") as HTMLButtonElement;
    return {
      emailField,
      passwordField,
      loginButton,
    };
  };
  it("render component correctly", async () => {
    const { emailField, passwordField, loginButton } = setup();
    expect(loginButton).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  it("warn when no username or password", async () => {
    const { loginButton } = setup();
    loginButton.click();
    const errorMessages = await screen.findAllByText("This field is required");
    expect(errorMessages.length).toBe(2);
  });

  it("warn if email is not valid", async () => {
    const { emailField, loginButton } = setup();
    fireEvent.change(emailField, { target: { value: "invalid" } });
    loginButton.click();
    const errorMessages = await screen.findByText("The input must be an email");
    expect(errorMessages).toBeInTheDocument();
  });
});
