import React, { FC, useState } from "react";
import { songs } from "../../data";
import { List, ListItemProps } from "../common/List";

import { Pane } from "evergreen-ui";

interface SongListProps {
  selected: number | null;
  setSelected: (id: number) => void;
}
export const SongList: FC<SongListProps> = ({ selected, setSelected }) => {
  return (
    <Pane
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "start",
        width: "100%",
      }}
    >
      <List
        data={songs.map((item) => ({
          id: item.id,
          title: item.title,
          artist: item.artist,
          rating: item.rating,
        }))}
        onSelect={(item: ListItemProps) => setSelected(item.id)}
      />
    </Pane>
  );
};
