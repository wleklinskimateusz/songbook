// Write storybook to a component called SongList
// Language: typescript

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SongList } from "./SongList";

export default {
  title: "Components/SongList",
  component: SongList,
};
const client = new QueryClient();

export const Default = () => {
  return (
    <QueryClientProvider client={client}>
      <SongList setSelected={() => {}} onAdd={() => {}} />;
    </QueryClientProvider>
  );
};
