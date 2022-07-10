import React, { FC } from "react";
import { songs } from "../../data";
import {
  containerStyles,
  LyricsContainer,
  titleStyles,
  lyricsStyles,
  chordsStyles,
} from "./styles";

import { Heading, Pre, Pane, Card } from "evergreen-ui";

interface SongViewProps {
  song: number;
}

export const SongView: FC<SongViewProps> = ({ song }) => {
  const currentSong = songs[song];
  return (
    <Card style={containerStyles} elevation={3}>
      <Heading style={titleStyles}>{currentSong.title}</Heading>
      <Pane
        style={{
          display: "flex",
        }}
      >
        <Pre style={lyricsStyles}>{currentSong.lyrics}</Pre>
        <Pre style={chordsStyles}>{currentSong.chords}</Pre>
      </Pane>
    </Card>
  );
};
