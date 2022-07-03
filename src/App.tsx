import React, { useEffect } from "react";
import "./App.css";
import { auth } from "./index";
import { User } from "firebase/auth";
import { LoginPanel } from "./components/LoginPanel/";
import styled from "styled-components";
import colors from "./colors";
import { SongList } from "./components/SongList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.background};
`


function App() {
  const [user, setUser] = React.useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });
  });

  return (
    <Container>
      <LoginPanel user={user} />
      <SongList />
    </Container>
  )

}

export default App;
