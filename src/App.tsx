import React, { useEffect } from "react";
import "./App.css";
import { auth } from "./index";
import { User } from "firebase/auth";
import { LoginPanel } from "./components/LoginPanel/";
import styled from "styled-components";
import colors from "./colors";
import { SongList } from "./components/SongList";
import { SongView } from "./components/SongView";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.background};
`;

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [selected, setSelected] = React.useState<number | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });
  });

  return (
    <Container>
      <LoginPanel user={user} />
      <SongList selected={selected} setSelected={setSelected} />
      {selected !== null && <SongView song={selected}/>}
    </Container>
  );
}

export default App;
