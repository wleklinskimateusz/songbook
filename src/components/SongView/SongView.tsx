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
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadString,
} from "firebase/storage";

interface SongViewProps {
  song: Song;
}

const isSaving = (event: React.KeyboardEvent<HTMLPreElement>) =>
  (event.ctrlKey || event.metaKey) && event.key === "s";

export const SongView: FC<SongViewProps> = ({ song }) => {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [chords, setChords] = useState<string | null>(null);
  const [editLyrics, setEditLyrics] = useState(false);
  const [editChords, setEditChords] = useState(false);
  const lyricsElement = useRef<HTMLPreElement>(null);
  const chordsElement = useRef<HTMLPreElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ProgressEvent<EventTarget> | null>(null);

  const onSave = (
    event: React.KeyboardEvent<HTMLPreElement>,
    source: "lyrics" | "chords"
  ) => {
    event.preventDefault();
    const storeRef = ref(storage, `${source}/${song.filename}`);
    console.log("dupa");
    uploadString(
      storeRef,
      (source === "lyrics" ? lyricsElement : chordsElement).current
        ?.innerText ?? ""
    ).then(() => {
      alert("Success!");
    });
  };

  useEffect(() => {
    const lyricsRef = ref(storage, `lyrics/${song.filename}`);
    const chordsRef = ref(storage, `chords/${song.filename}`);
    const fetch = async (
      ref: StorageReference,
      setData: (arg: string) => void
    ) => {
      let url;
      try {
        url = await getDownloadURL(ref);
      } catch (e) {
        console.error(e);
        setData("");

        return;
      }
      const xhr = new XMLHttpRequest();
      xhr.responseType = "text";
      xhr.onload = async () => {
        try {
          const data: string = await xhr.response;
          setData(data);
          setIsLoading(false);
        } catch (e) {
          console.error(e);
          console.log("dupa!!!");
        }
      };
      xhr.onerror = (error) => {
        setError(error);
        console.log("dupa");
      };
      setIsLoading(true);
      xhr.open("GET", url);
      xhr.send();
    };
    try {
      fetch(lyricsRef, setLyrics);
      fetch(chordsRef, setChords);
    } catch (e) {
      console.error(e);
      console.log("dupa");
    }
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
              onKeyDown={(event: React.KeyboardEvent<HTMLPreElement>) =>
                isSaving(event) && onSave(event, "lyrics")
              }
            >
              {lyrics}
            </Pre>
            <Pre
              ref={chordsElement}
              style={chordsStyles}
              onClick={() => setEditChords(true)}
              contentEditable={editChords}
              onBlur={() => setEditChords(false)}
              onKeyDown={(event: React.KeyboardEvent<HTMLPreElement>) =>
                isSaving(event) && onSave(event, "chords")
              }
            >
              {chords}
            </Pre>
          </>
        )}
      </Pane>
    </Card>
  );
};
