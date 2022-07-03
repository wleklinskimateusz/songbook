import React, { FC } from "react";
import { Container, List, ListItem, ListTitle } from "./styles";
import { songs } from "../../data";

interface SongListProps {
  selected: number | null;
  setSelected: (id: number) => void;
}

export const SongList: FC<SongListProps> = ({ selected, setSelected }) => {
  return (
    <Container>
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
    </Container>
  );
};
