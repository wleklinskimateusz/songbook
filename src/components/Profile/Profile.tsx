import { Avatar, IconButton, LogOutIcon, Pane } from "evergreen-ui";
import { User } from "firebase/auth";
import React, { FC } from "react";
import { createSignOut } from "../../auth";

type ProfileProps = {
  user: User;
};

export const Profile: FC<ProfileProps> = ({ user }) => {
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
        <Avatar name={user.displayName} size={40} />
        <IconButton
          style={{
            margin: "0.5rem",
          }}
          icon={LogOutIcon}
          onClick={signOut}
        />
      </Pane>
    </Pane>
  );
};
