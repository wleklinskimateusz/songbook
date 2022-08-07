import { AuthError } from "firebase/auth";
import React, { FC, useState } from "react";
import { Icon, Link } from "evergreen-ui";
import { Alert, Pane } from "evergreen-ui";
import { createSignIn } from "../../auth";
import { GoogleIcon, FacebookIcon, AppleIcon } from "../../assets/icons";
import styled from "styled-components";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

const BottomStyled = styled.div`
  position: fixed;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const AuthPanelStyled = styled(Pane)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const AuthPanel: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [createAccount, setCreateAccount] = useState(false);

  const { googleSignIn } = createSignIn(setError);
  const providers = [
    { icon: GoogleIcon, onClick: googleSignIn },
    { icon: FacebookIcon, onClick: () => {} },
    { icon: AppleIcon, onClick: () => {} },
  ];
  const form = createAccount ? (
    <SignUpForm setError={setError} />
  ) : (
    <LoginForm setError={setError} />
  );

  return (
    <>
      <AuthPanelStyled>
        {error && <Alert margin="0.5rem" intent="danger" title={error} />}
        <Pane display={"flex"} alignItems="center" flexDirection="column">
          <>
            {form}
            <BottomStyled>
              <Link
                cursor="pointer"
                onClick={() => setCreateAccount((prev) => !prev)}
              >
                {createAccount
                  ? "I already have an account"
                  : "Create an account"}
              </Link>

              <IconsContainer>
                {providers.map((item, key) => (
                  <IconStyled
                    key={key}
                    icon={item.icon}
                    onClick={item.onClick}
                  />
                ))}
              </IconsContainer>
            </BottomStyled>
          </>
        </Pane>
      </AuthPanelStyled>
    </>
  );
};
