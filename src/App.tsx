import React, { useEffect } from "react";
import { auth } from "./index";
import { User } from "firebase/auth";
import { LoginPanel } from "./components/LoginPanel/";
import styled from "styled-components";
import { SongList } from "./components/SongList";
import { SongView } from "./components/SongView";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  align-items: center;
  justify-items: center;
  width: 100vw;
`;

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [selected, setSelected] = React.useState<number | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });
  });

  return (<>
  <LoginPanel user={user} />
    <Container>
      
      <SongList selected={selected} setSelected={setSelected} />
      {selected !== null ? <SongView song={selected}/> : <></>}
    </Container>
    </>
  );
}

export default App;
