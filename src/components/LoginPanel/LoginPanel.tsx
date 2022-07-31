import { User, AuthError } from "firebase/auth";
import React, { FC, useState } from "react";
import {
  Avatar,
  IconButton,
  LogOutIcon,
  LogInIcon,
  Alert,
  Pane,
} from "evergreen-ui";
import { createSignIn, createSignOut } from "../../auth";

interface LoginPanelProps {
  user: User | null;
}

export const LoginPanel: FC<LoginPanelProps> = ({ user }) => {
  const [error, setError] = useState<AuthError | null>(null);

  const signIn = createSignIn(setError);
  const signOut = createSignOut();

  return (
    <Pane
      position={"absolute"}
      top={"0"}
      right={"0"}
      padding={"1rem"}
      display="flex"
      flexDirection={"column"}
      margin={"1rem"}
      elevation={1}
    >
      <Pane display={"flex"} alignItems="center">
        {user ? (
          <>
            <Avatar name={user.displayName} size={40} />
            <IconButton
              style={{
                margin: "0.5rem",
              }}
              icon={LogOutIcon}
              onClick={signOut}
            />
          </>
        ) : (
          <IconButton icon={LogInIcon} onClick={signIn} />
        )}
      </Pane>

      {error && <Alert intent="danger">{error.message}</Alert>}
    </Pane>
  );
};
