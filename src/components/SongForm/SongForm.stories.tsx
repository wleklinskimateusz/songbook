import React from "react";

import { SongForm } from "./SongForm";

export default {
  title: "Components/SongForm",
  component: SongForm,
};

export const Default = () => {
  return <SongForm isShown={true} setIsShown={() => {}} setAlert={() => {}} />;
};
