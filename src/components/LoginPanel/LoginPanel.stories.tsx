import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LoginPanel } from "./LoginPanel";

export default {
  title: "Components/LoginPanel",
  component: LoginPanel,
} as ComponentMeta<typeof LoginPanel>;

export const NoUser: ComponentStory<typeof LoginPanel> = () => <LoginPanel />;
