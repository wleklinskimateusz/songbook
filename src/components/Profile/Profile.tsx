import {
  Avatar,
  LogOutIcon,
  Pane,
  Popover,
  Position,
  Menu,
  PeopleIcon,
  EditIcon,
} from "evergreen-ui";
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
      cursor="pointer"
    >
      <Pane display={"flex"} alignItems="center">
        <Popover
          position={Position.BOTTOM_LEFT}
          content={
            <Menu>
              <Menu.Group title="Actions">
                <Menu.Item icon={PeopleIcon}>Create Songlist</Menu.Item>
              </Menu.Group>
              <Menu.Divider />
              <Menu.Group title="Profile">
                <Menu.Item icon={EditIcon}>Manage Account</Menu.Item>
                <Menu.Item icon={LogOutIcon} intent="danger" onSelect={signOut}>
                  Log Out
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <Avatar name={user.displayName} size={40} />
        </Popover>
      </Pane>
    </Pane>
  );
};
