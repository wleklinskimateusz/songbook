import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./index";
import { User } from "firebase/auth";
import { LoginPanel } from "./components/LoginPanel";
import styled from "styled-components";
import colors from "./colors";

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
    </Container>
  )

}

export default App;
