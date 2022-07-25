import React, { useEffect } from "react";
import { auth } from "./index";
import { User } from "firebase/auth";
import { LoginPanel } from "./components/LoginPanel/";

import { SongList } from "./components/SongList";
import { SongView } from "./components/SongView";
import { SongForm } from "./components/SongForm";
import { Pane } from "evergreen-ui";

import { Song } from "./types";

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [selected, setSelected] = React.useState<Song | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });
  });

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
        <SongList setSelected={setSelected} />
        {selected !== null ? <SongView song={selected} /> : <></>}
      </Pane>
      <SongForm />
    </>
  );
}

export default App;
