import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AuthPanel } from "./AuthPanel";

export default {
  title: "Components/LoginPanel",
  component: AuthPanel,
} as ComponentMeta<typeof AuthPanel>;

export const NoUser: ComponentStory<typeof AuthPanel> = () => <AuthPanel />;
