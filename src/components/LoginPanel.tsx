import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "..";
import { User, AuthError } from "firebase/auth";
import React, { FC } from "react";
import styled from "styled-components";
import colors from "../colors";

const provider = new GoogleAuthProvider();

interface LoginPanelProps {
  user: User | null;
}

const Box = styled.div`
position: absolute;
top: 0;
right: 0;
  margin: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  background-color: ${colors.primary};
  color: ${colors.secondary};
`;

const Button = styled.button`
  cursor: pointer;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
  }
`;

export const LoginPanel: FC<LoginPanelProps> = ({ user }) => {
  const [error, setError] = React.useState<AuthError | null>(null);
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // ...
      })
      .catch((error: AuthError) => {
        setError(error);
      });
  };
  return (
    <Box>
      {user ? (
        <>
          <h2>Hello {user.displayName}</h2>
          <Button onClick={() => auth.signOut()}>Sign out</Button>
        </>
      ) : (
        <Button onClick={signIn}>Sign in</Button>
      )}
      {error && <p>{error.message}</p>}
    </Box>
  );
};
