import React, { useEffect } from "react";
import { auth, db } from "./index";
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
    const output: Song[] = [];
    const querySnapshot = await getDocs(collection(db, "songs"));
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
  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });
  });
  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
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
    </>
  );
}

export default App;
