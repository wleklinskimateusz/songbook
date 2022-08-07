import { Button, FormField, TextInput } from "evergreen-ui";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { createStandardSignUp } from "../../auth";
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
interface FormData {
  email: string;
  password: string;
  repeatPassword: string;
}

export const SignUpForm: FC<{
  setError: (error: string) => void;
}> = ({ setError }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const standardSignUp = createStandardSignUp(setError);
  const onSubmit = (data: FormData) => {
    const { email, password } = data;
    standardSignUp(email, password);
  };
  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <FormField
        isRequired
        validationMessage={errors.email?.message}
        label="Email"
        margin="0.5rem"
      >
        <TextInput
          placeholder="Type your email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "The input must be an email",
            },
          })}
        />
      </FormField>
      <FormField
        validationMessage={errors.password?.message}
        isRequired
        label="Password"
        margin="0.5rem"
      >
        <TextInput
          placeholder="Type your password"
          type="password"
          {...register("password", { required: "This field is required" })}
        />
      </FormField>
      <FormField
        validationMessage={errors.repeatPassword?.message}
        isRequired
        label="Repeat Password"
        margin="0.5rem"
      >
        <TextInput
          placeholder="Repeat your password"
          type="password"
          {...register("repeatPassword", {
            required: "This field is required",
            validate: (value) =>
              value === watch("password") || "Password do not match",
          })}
        />
      </FormField>
      <Button type="submit" width="fit-content" margin="0.5rem">
        Sign Up
      </Button>
    </FormStyled>
  );
};
