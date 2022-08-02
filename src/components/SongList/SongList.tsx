import React, { FC } from "react";
import { Button, Pane } from "evergreen-ui";

import { List } from "../common";
import { Song } from "../../types";
import { useFetchSongList } from "../../hooks";

type Props = {
  setSelected: (song: Song | null) => void;
  onAdd: () => void;
  fetchedSongs: {
    isLoading: boolean;
    isError: boolean;
    songs: Song[];
  };
};

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
      <Button onClick={onAdd}>Add song</Button>
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
    </Pane>
  );
};
