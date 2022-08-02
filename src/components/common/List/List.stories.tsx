import React from "react";
import { List } from "./List";

export default {
  title: "Components/common/List",
  component: List,
};

export const Default = () => {
  return (
    <List
      data={[
        { title: "A Song", artist: "Me", rating: 5 },
        { title: "Another Song", artist: "You", rating: 4 },
        { title: "Yet Another Song", artist: "They", rating: 3 },
        { title: "The Last Song", artist: "Us", rating: 2 },
        { title: "YMCA", artist: "Hey you", rating: 1 },
        { title: "Hello, Hello", artist: "Me", rating: 5 },
        { title: "Harry Potter is dead", artist: "Me", rating: 5 },
        { title: "Harry Potter is alive", artist: "Me", rating: 5 },
      ]}
      onSelect={() => {}}
    />
  );
};
