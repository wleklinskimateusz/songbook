import React, { FC, useEffect, useState } from "react";

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
import { db, storage } from "../..";
import { Song } from "../../types";
import { getDownloadURL, ref } from "firebase/storage";

interface SongViewProps {
  song: Song;
}

export const SongView: FC<SongViewProps> = ({ song }) => {
  const lyricsRef = ref(storage, `lyrics/${song.filename}`);
  const chordsRef = ref(storage, `chords/${song.filename}`);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [chords, setChords] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ProgressEvent<EventTarget> | null>(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      const url = await getDownloadURL(lyricsRef);
      const xhr = new XMLHttpRequest();
      xhr.responseType = "text";
      xhr.onload = async () => {
        setLyrics(await xhr.response);
        setIsLoading(false);
      };
      xhr.onerror = (error) => {
        setError(error);
      };
      setIsLoading(true);
      xhr.open("GET", url);
      xhr.send();
    };
    fetchLyrics();
  }, []);
  useEffect(() => {
    const fetchLyrics = async () => {
      const url = await getDownloadURL(chordsRef);
      const xhr = new XMLHttpRequest();
      xhr.responseType = "text";
      xhr.onload = async () => {
        setChords(await xhr.response);
        setIsLoading(false);
      };
      xhr.onerror = (error) => {
        setError(error);
      };
      setIsLoading(true);
      xhr.open("GET", url);
      xhr.send();
    };
    fetchLyrics();
  }, []);

  if (isLoading) return <>Loading...</>;
  if (error) return <>Ups!, error: {error.type}</>;

  return (
    <Card style={containerStyles} elevation={3}>
      <Heading style={titleStyles}>{song.title}</Heading>
      <Pane
        style={{
          display: "flex",
        }}
      >
        <Pre style={lyricsStyles}>{lyrics}</Pre>
        <Pre style={chordsStyles}>{chords}</Pre>
      </Pane>
    </Card>
  );
};
