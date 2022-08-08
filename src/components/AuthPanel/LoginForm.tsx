import { Button, FormField, TextInput } from "evergreen-ui";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { createStandardSignIn } from "../../auth";
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
interface FormData {
  email: string;
  password: string;
}

export const LoginForm: FC<{
  setError: (error: string) => void;
}> = ({ setError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const standardSignIn = createStandardSignIn(setError);
  const onSubmit = (data: FormData) => {
    const { email, password } = data;
    standardSignIn(email, password);
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
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "The input must be an email",
            },
          })}
          placeholder="Type your email"
        />
      </FormField>
      <FormField
        isRequired
        validationMessage={errors.password?.message}
        label="Password"
        margin="0.5rem"
      >
        <TextInput
          {...register("password", { required: "This field is required" })}
          type="password"
          placeholder="Type your password"
        />
      </FormField>
      <Button type="submit" width="fit-content" margin="0.5rem">
        Log In
      </Button>
    </FormStyled>
  );
};
