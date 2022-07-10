import React, { FC } from "react";
import { songs } from "../../data";
import { useQuery } from "react-query";
import {
  containerStyles,
  LyricsContainer,
  titleStyles,
  lyricsStyles,
  chordsStyles,
} from "./styles";

import { Heading, Pre, Pane, Card } from "evergreen-ui";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../..";
import { Song } from "../../types";

interface SongViewProps {
  song: Song;
}

export const SongView: FC<SongViewProps> = ({ song }) => {
  return (
    <Card style={containerStyles} elevation={3}>
      <Heading style={titleStyles}>{song.title}</Heading>
      <Pane
        style={{
          display: "flex",
        }}
      >
        <Pre style={lyricsStyles}>{song.lyrics}</Pre>
        <Pre style={chordsStyles}>{song.chords}</Pre>
      </Pane>
    </Card>
  );
};
