import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Song } from "../../types";
import { SongList } from "./SongList";

export default {
  title: "Components/SongList",
  component: SongList,
};

export const Default = () => {
  const [songs, setSongs] = React.useState<Song[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const isError = false;

  const askForASong = React.useCallback(async () => {
    setIsLoading(true);
    // wait for 0.5 second
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSongs([
      ...songs,
      {
        id: "1",
        title: "New song",
        artist: "New artist",
        filename: "New filename",
        rating: 0,
      },
    ]);
    setIsLoading(false);
  }, [songs]);

  return (
    <SongList
      setSelected={(song) =>
        song && alert("A Song has been selected: " + song.title)
      }
      onAdd={() => askForASong()}
      fetchedSongs={{ songs, isLoading, isError }}
    />
  );
};
