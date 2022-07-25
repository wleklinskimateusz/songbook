import React, { useEffect, useState } from "react";
import { auth, db, storage } from "./index";
import { User } from "firebase/auth";
import { LoginPanel } from "./components/LoginPanel/";
import styled from "styled-components";
import { SongList } from "./components/SongList";
import { SongView } from "./components/SongView";
import { Pane } from "evergreen-ui";
import { useQuery } from "react-query";
import { collection, getDocs } from "firebase/firestore";
import { Song } from "./types";
import { ListItemProps } from "./components/common/List";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  align-items: center;
  width: 100vw;
  margin: 2rem;
  padding: 2rem;
`;

function App() {
  const { data, isLoading, isError } = useQuery("songs", async () => {
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
  const [user, setUser] = React.useState<User | null>(null);
  const [selected, setSelected] = React.useState<Song | null>(null);
  const lyricsRef = ref(storage, "lyrics/szanta_narciarska.txt");
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
  const [errorLyrics, setErrorLyrics] =
    useState<ProgressEvent<EventTarget> | null>(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      const url = await getDownloadURL(lyricsRef);
      const xhr = new XMLHttpRequest();
      xhr.responseType = "text";
      xhr.onload = async () => {
        setLyrics(await xhr.response);
        setIsLoadingLyrics(false);
      };
      xhr.onerror = (error) => {
        setErrorLyrics(error);
      };
      setIsLoadingLyrics(true);
      xhr.open("GET", url);
      xhr.send();
    };
    fetchLyrics();
  }, []);
  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });
  });
  if (isLoading || isLoadingLyrics) {
    return <>Loading...</>;
  }

  if (isError || errorLyrics) {
    return <>Ups... Error</>;
  }

  if (!data) {
    return <>No data</>;
  }

  return (
    <>
      <LoginPanel user={user} />
      <Pane
        display={"grid"}
        gridTemplateColumns={"1fr 1fr"}
        alignItems={"center"}
        margin={"2rem"}
        padding={"2rem"}
      >
        <SongList
          onSelect={(id: string) =>
            setSelected(data.find((song) => song.id === id) ?? null)
          }
          songs={data}
        />
        {selected !== null ? <SongView song={selected} /> : <></>}
      </Pane>
      <button
        onClick={() => {
          console.log(lyrics);
        }}
      >
        Get me some lyrics
      </button>
    </>
  );
}

export default App;
