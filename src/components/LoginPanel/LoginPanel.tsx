import { AuthError } from "firebase/auth";
import React, { FC, useState } from "react";
import {
  Button,
  FormField,
  FormFieldDescription,
  Icon,
  Text,
  TextInput,
} from "evergreen-ui";
import { Alert, Pane } from "evergreen-ui";
import { createSignIn } from "../../auth";
import { GoogleIcon, FacebookIcon, AppleIcon } from "../../assets/icons";
import styled from "styled-components";
import { colors } from "../../config";
import { saturate } from "polished";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconsContainer = styled.div`
  display: flex;
`;

const IconStyled = styled(Icon)`
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 25%;
  transition: all 0.5s;

  &:hover {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  }
`;

export const LoginPanel: FC = () => {
  const [error, setError] = useState<AuthError | null>(null);

  const { googleSignIn, standardSignIn } = createSignIn(setError);
  const providers = [
    { icon: GoogleIcon, onClick: googleSignIn },
    { icon: FacebookIcon, onClick: () => {} },
    { icon: AppleIcon, onClick: () => {} },
  ];

  return (
    <>
      {error && <Alert intent="error">{error.message}</Alert>}
      <Pane
        display="flex"
        width="100vw"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Pane display={"flex"} alignItems="center" flexDirection="column">
          <>
            <FormStyled
              onSubmit={(event) => {
                const email = (
                  event.currentTarget.elements[0] as HTMLInputElement
                ).value;
                const password = (
                  event.currentTarget.elements[1] as HTMLInputElement
                ).value;
                standardSignIn(email, password);
              }}
            >
              <FormField label="Username" margin="0.5rem">
                <TextInput placeholder="Type your username" />
              </FormField>
              <FormField label="Password" margin="0.5rem">
                <TextInput type="password" placeholder="Type your password" />
              </FormField>
              <Button type="submit" width="fit-content" margin="0.5rem">
                Log In
              </Button>
            </FormStyled>
            <IconsContainer>
              {providers.map((item, key) => (
                <IconStyled key={key} icon={item.icon} onClick={item.onClick} />
              ))}
            </IconsContainer>
          </>
        </Pane>

        {error && <Alert intent="danger">{error.message}</Alert>}
      </Pane>
    </>
  );
};
