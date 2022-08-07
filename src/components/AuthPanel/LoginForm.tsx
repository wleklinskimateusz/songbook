import { Button, FormField, TextInput } from "evergreen-ui";
import { AuthError } from "firebase/auth";
import React, { FC } from "react";
import styled from "styled-components";
import { createStandardSignIn } from "../../auth";
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginForm: FC<{
  setError: (error: AuthError) => void;
}> = ({ setError }) => {
  const standardSignIn = createStandardSignIn(setError);
  return (
    <FormStyled
      onSubmit={(event) => {
        const email = (event.currentTarget.elements[0] as HTMLInputElement)
          .value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement)
          .value;
        standardSignIn(email, password);
      }}
    >
      <FormField label="Email" margin="0.5rem">
        <TextInput placeholder="Type your email" />
      </FormField>
      <FormField label="Password" margin="0.5rem">
        <TextInput type="password" placeholder="Type your password" />
      </FormField>
      <Button type="submit" width="fit-content" margin="0.5rem">
        Log In
      </Button>
    </FormStyled>
  );
};
