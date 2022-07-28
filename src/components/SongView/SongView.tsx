import React, { FC, useEffect, useRef, useState } from "react";

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
import { getDownloadURL, ref, StorageReference } from "firebase/storage";

interface SongViewProps {
  song: Song;
}

export const SongView: FC<SongViewProps> = ({ song }) => {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [chords, setChords] = useState<string | null>(null);
  const [editLyrics, setEditLyrics] = useState(false);
  const [editChords, setEditChords] = useState(false);
  const lyricsElement = useRef<HTMLPreElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ProgressEvent<EventTarget> | null>(null);

  useEffect(() => {
    const lyricsRef = ref(storage, `lyrics/${song.filename}`);
    const chordsRef = ref(storage, `chords/${song.filename}`);
    const fetch = async (
      ref: StorageReference,
      setData: (arg: string) => void
    ) => {
      const url = await getDownloadURL(ref);
      console.log("url", url);
      const xhr = new XMLHttpRequest();
      xhr.responseType = "text";
      xhr.onload = async () => {
        setData(await xhr.response);
        setIsLoading(false);
      };
      xhr.onerror = (error) => {
        setError(error);
      };
      setIsLoading(true);
      xhr.open("GET", url);
      xhr.send();
    };
    fetch(lyricsRef, setLyrics);
    fetch(chordsRef, setChords);
  }, [song.filename]);

  if (error) return <>Ups!, error: {error.type}</>;

  return (
    <Card style={containerStyles} elevation={3}>
      <Heading style={titleStyles}>{song.title}</Heading>
      <Pane
        style={{
          display: "flex",
        }}
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <Pre
              ref={lyricsElement}
              style={lyricsStyles}
              onClick={() => setEditLyrics(true)}
              contentEditable={editLyrics}
              onBlur={() => setEditLyrics(false)}
              onKeyDown={(event: React.KeyboardEvent<HTMLPreElement>) => {
                if (event.ctrlKey || event.metaKey) {
                }
                let charCode = String.fromCharCode(event.which).toLowerCase();
                if ((event.ctrlKey || event.metaKey) && charCode === "s") {
                  alert("CTRL+S Pressed");
                  event.preventDefault();
                } else if (
                  (event.ctrlKey || event.metaKey) &&
                  charCode === "c"
                ) {
                  alert("CTRL+C Pressed");
                  event.preventDefault();
                } else if (
                  (event.ctrlKey || event.metaKey) &&
                  charCode === "v"
                ) {
                  alert("CTRL+V Pressed");
                  event.preventDefault();
                }
              }}
            >
              {lyrics}
            </Pre>
            <Pre
              style={chordsStyles}
              onClick={() => setEditChords(true)}
              contentEditable={editChords}
              onBlur={() => setEditChords(false)}
            >
              {chords}
            </Pre>
          </>
        )}
      </Pane>
    </Card>
  );
};
