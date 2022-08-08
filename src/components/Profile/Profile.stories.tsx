import React from "react";
import { MockUser } from "../../testing";
import { Profile } from "./Profile";

export default {
  title: "Components/Profile",
  component: Profile,
};

export const Default = () => <Profile user={MockUser} />;
