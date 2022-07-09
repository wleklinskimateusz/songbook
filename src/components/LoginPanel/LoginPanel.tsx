import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../..";
import { User, AuthError } from "firebase/auth";
import React, { FC } from "react";
import { Box } from "./styles";
import { Avatar, IconButton, LogOutIcon, LogInIcon, Alert, Pane } from "evergreen-ui";

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
    <Pane position={"absolute"} top={"0"} right={"0"} display="flex" flexDirection={"column"} margin={"1rem"}>
      <Pane display={"flex"} alignItems="center" >
      {user ? (
        <>
          <Avatar name={user.displayName} size={40} />
          <IconButton style={{
            margin: "0.5rem"
          }} icon={LogOutIcon} onClick={() => auth.signOut()}/>
        </>
      ) : (
        <IconButton icon={LogInIcon} onClick={signIn} />
      )}
      </Pane>
     
      {error && <Alert intent="danger">{error.message}</Alert>}
    </Pane>
  );
};
