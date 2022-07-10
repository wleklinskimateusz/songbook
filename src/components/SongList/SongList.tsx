import React, { FC, useState } from "react";
import { List, ListItemProps } from "../common/List";
import { Song } from "../../types";

import { Pane } from "evergreen-ui";

interface SongListProps {
  onSelect: (id: string) => void;
  songs: Song[];
}
export const SongList: FC<SongListProps> = ({ onSelect, songs }) => {
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
        onSelect={onSelect}
      />
    </Pane>
  );
};
