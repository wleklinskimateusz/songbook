import React from "react";
import { SignUpForm } from "./SignUpForm";

export default {
  title: "Components/auth/SignUpForm",
  component: SignUpForm,
};

export const Default = () => <SignUpForm setError={() => {}} />;
