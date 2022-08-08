import React from "react";
import { LoginForm } from "./LoginForm";

export default {
  title: "Components/auth/LoginForm",
  component: LoginForm,
};

export const Default = () => <LoginForm setError={() => {}} />;
