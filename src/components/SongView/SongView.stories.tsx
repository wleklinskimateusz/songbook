// Write storybook to a component called SongView
// Language: typescript

import React from "react";
import { SongView } from "./SongView";

export default {
  title: "Components/SongView",
  component: SongView,
};

export const Default = () => {
  return (
    <SongView
      song={{ title: "A Song", artist: "Me", filename: "abc.txt" }}
      setAlert={() => {}}
    />
  );
};
