import React, { useEffect, useState } from "react";
import { auth } from "./index";
import { User } from "firebase/auth";

import { SongList, SongView, SongForm, LoginPanel } from "./components";
import { Alert, Pane } from "evergreen-ui";

import { Song } from "./types";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [selected, setSelected] = useState<Song | null>(null);
  const [isShownForm, setIsShownForm] = useState(false);
  const [alert, setAlert] = useState<null | "success" | "error">(null);
  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });
  });

  return (
    <>
      <LoginPanel user={user} />
      {alert && (
        <Alert
          intent={alert}
          title={
            alert === "success"
              ? "Adding Successful"
              : "Something went wrong :/"
          }
        />
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
        />
        {selected !== null ? (
          <SongView setAlert={setAlert} song={selected} />
        ) : (
          <></>
        )}
      </Pane>
      <SongForm isShown={isShownForm} setIsShown={setIsShownForm} />
    </>
  );
}

export default App;
