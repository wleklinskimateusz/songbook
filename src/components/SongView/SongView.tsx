import React, { FC } from "react";
import { songs } from "../../data";
import { Chords, Container, Lyrics, LyricsContainer, Title } from "./styles";

interface SongViewProps {
  song: number;
}

export const SongView: FC<SongViewProps> = ({ song }) => {
  const currentSong = songs[song];
  return (
    <Container>
      <Title>{currentSong.title}</Title>
      <LyricsContainer>
        <Lyrics>{currentSong.lyrics}</Lyrics>
        <Chords>{currentSong.chords}</Chords>
      </LyricsContainer>
    </Container>
  );
};
