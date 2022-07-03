import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../..";
import { User, AuthError } from "firebase/auth";
import React, { FC } from "react";
import { Box, Button } from "./styles";

const provider = new GoogleAuthProvider();

interface LoginPanelProps {
  user: User | null;
}

export const LoginPanel: FC<LoginPanelProps> = ({ user }) => {
  const [error, setError] = React.useState<AuthError | null>(null);
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
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
