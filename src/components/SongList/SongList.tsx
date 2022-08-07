import React, { FC } from "react";
import { AddIcon, Icon, Pane } from "evergreen-ui";

import { List } from "../common";
import { Song } from "../../types";
import styled from "styled-components";

type Props = {
  setSelected: (song: Song | null) => void;
  onAdd: () => void;
  fetchedSongs: {
    isLoading: boolean;
    isError: boolean;
    songs: Song[];
  };
};

const IconStyled = styled(Icon)`
  margin: 0.5rem;
  padding: 0.5rem;
  color: #1da81d;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #106210;
  }
`;

const SongListStyled = styled(Pane)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: start;
  width: 100%;
`;

export const SongList: FC<Props> = ({ setSelected, onAdd, fetchedSongs }) => {
  const { songs, isLoading, isError } = fetchedSongs;
  if (isError) {
    return <>Ups... Error</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }

  if (!songs) {
    return <>No data</>;
  }
  return (
    <SongListStyled>
      <IconStyled icon={AddIcon} onClick={onAdd} />

      <List
        data={
          songs?.map((item) => ({
            id: item.id,
            title: item.title,
            artist: item.artist,
            rating: item.rating,
          })) || []
        }
        onSelect={(id: string) =>
          setSelected(songs?.find((item) => item.id === id) || null)
        }
      />
    </SongListStyled>
  );
};
