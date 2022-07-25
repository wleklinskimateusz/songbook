import React, { FC } from "react";
import { List } from "../common/List";
import { Song } from "../../types";

import { Pane } from "evergreen-ui";
import { useQuery } from "react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../..";

interface SongListProps {
  setSelected: (song: Song | null) => void;
}
export const SongList: FC<SongListProps> = ({ setSelected }) => {
  const {
    data: songs,
    isLoading,
    isError,
  } = useQuery("songs", async () => {
    const querySnapshot = await getDocs(collection(db, "songs"));
    const output: Song[] = [];
    querySnapshot.forEach((doc) => {
      output.push({
        id: doc.id,
        ...doc.data(),
      } as Song);
    });
    return output;
  });
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
