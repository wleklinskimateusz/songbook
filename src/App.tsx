import React, { useEffect, useState } from "react";
import { auth } from "./index";
import { User } from "firebase/auth";

import { SongList, SongView, SongForm, AuthPanel, Profile } from "./components";
import { Alert, Pane } from "evergreen-ui";
import { Song, AlertStatus } from "./types";
import { useFetchSongList } from "./hooks";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [selected, setSelected] = useState<Song | null>(null);
  const [isShownForm, setIsShownForm] = useState(false);
  const [alert, setAlert] = useState<AlertStatus>(AlertStatus.None);
  const songs = useFetchSongList();
  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });
  });
  if (user === null) {
    return <AuthPanel />;
  }

  return (
    <>
      <Profile user={user} />
      {alert === AlertStatus.None ? (
        <></>
      ) : alert === AlertStatus.Success ? (
        <Alert intent="success" title="Mission Accomplished" />
      ) : (
        <Alert intent="error" title="Something went wrong :/" />
      )}
      <Pane
        display={"grid"}
        gridTemplateColumns={"1fr 1fr"}
        alignItems={"center"}
        margin={"2rem"}
        padding={"2rem"}
      >
        <SongList
          setSelected={setSelected}
          onAdd={() => setIsShownForm(true)}
          fetchedSongs={songs}
        />
        {selected !== null ? (
          <SongView setAlert={setAlert} song={selected} />
        ) : (
          <></>
        )}
      </Pane>
      <SongForm
        setAlert={setAlert}
        isShown={isShownForm}
        setIsShown={setIsShownForm}
      />
    </>
  );
}

export default App;
