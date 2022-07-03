import React from "react";
import { Song } from "../../types/Song";
import { List, ListItem, ListTitle } from "./styles";

const songs: Song[] = [
  {
    id: 0,
    title: "Song 1",
  },
  {
    id: 1,
    title: "Song 2",
  },
  {
    id: 2,
    title: "Song 3",
  },
  {
    id: 3,
    title: "Song 4",
  },
];

export const SongList = () => {
  const [selected, setSelected] = React.useState<number | null>(null);
  return (
    <>
      <ListTitle>Song Book</ListTitle>
      <List>
        {songs.map((song, i) => (
          <ListItem
            onClick={() => setSelected(song.id)}
            key={song.id}
            selected={selected === song.id}
          >
            {song.title}
          </ListItem>
        ))}
      </List>
    </>
  );
};
