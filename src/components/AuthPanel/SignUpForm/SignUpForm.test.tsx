import { fireEvent, render, screen } from "@testing-library/react";
import { SignUpForm } from "./SignUpForm";

describe("SignUpForm", () => {
  const setup = () => {
    render(<SignUpForm setError={() => {}} />);
    const emailField = screen.getByPlaceholderText(/type your email/i);
    const passwordField = screen.getByPlaceholderText(/type your password/i);
    const repeatPasswordField =
      screen.getByPlaceholderText(/repeat your password/i);
    const signUpButton = screen.getByText("Sign Up") as HTMLButtonElement;
    return {
      emailField,
      passwordField,
      repeatPasswordField,
      signUpButton,
    };
  };
  it("render component correctly", async () => {
    const { emailField, passwordField, repeatPasswordField, signUpButton } =
      setup();
    expect(signUpButton).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(repeatPasswordField).toBeInTheDocument();
  });

  it("warn when no username or password", async () => {
    const { signUpButton } = setup();
    signUpButton.click();
    const errorMessages = await screen.findAllByText("This field is required");
    expect(errorMessages.length).toBe(3);
  });

  it("warn if email is not valid", async () => {
    const { emailField, signUpButton } = setup();
    fireEvent.change(emailField, { target: { value: "invalid" } });
    signUpButton.click();
    const errorMessages = await screen.findByText("The input must be an email");
    expect(errorMessages).toBeInTheDocument();
  });

  it("warn if passwords do not match", async () => {
    const { passwordField, repeatPasswordField, signUpButton } = setup();
    fireEvent.change(passwordField, { target: { value: "password" } });
    fireEvent.change(repeatPasswordField, { target: { value: "password2" } });
    signUpButton.click();
    const errorMessages = await screen.findByText("Password do not match");
    expect(errorMessages).toBeInTheDocument();
  });
});
