import { Button, FormField, TextInput } from "evergreen-ui";
import React, { FC, useRef } from "react";
import styled from "styled-components";
import { createStandardSignUp } from "../../auth";
import { isEmailValid } from "../../auth/validation";
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const getInput = (event: React.FormEvent<HTMLFormElement>, idx: number) =>
  (event.currentTarget.elements[idx] as HTMLInputElement).value;

export const SignUpForm: FC<{
  setError: (error: string) => void;
}> = ({ setError }) => {
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const repeatPasswordElement = useRef<HTMLInputElement>(null);
  const standardSignUp = createStandardSignUp(setError);
  return (
    <FormStyled
      onSubmit={(event) => {
        event.preventDefault();
        const email = getInput(event, 0);
        const password = getInput(event, 1);
        const repeatPassword = getInput(event, 2);
        if (password !== repeatPassword) {
          setError("Passwords do not match!");
        } else {
          standardSignUp(email, password);
        }
      }}
    >
      <FormField
        validationMessage={"This is not a valid email"}
        isRequired
        label="Email"
        margin="0.5rem"
      >
        <TextInput
          ref={emailElement}
          isInvalid={
            emailElement.current
              ? !isEmailValid(emailElement.current.value)
              : true
          }
          required
          placeholder="Type your email"
        />
      </FormField>
      <FormField isRequired label="Password" margin="0.5rem">
        <TextInput
          ref={passwordElement}
          required
          type="password"
          placeholder="Type your password"
        />
      </FormField>
      <FormField
        validationMessage={"Passwords must much"}
        isRequired
        label="Repeat Password"
        margin="0.5rem"
      >
        <TextInput
          ref={repeatPasswordElement}
          required
          isInvalid={passwordElement !== repeatPasswordElement}
          type="password"
          placeholder="Repeat your password"
        />
      </FormField>
      <Button type="submit" width="fit-content" margin="0.5rem">
        Sign Up
      </Button>
    </FormStyled>
  );
};
