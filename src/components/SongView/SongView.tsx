import React, { FC, useEffect, useRef, useState } from "react";

import {
  containerStyles,
  titleStyles,
  lyricsStyles,
  chordsStyles,
} from "./styles";

import { Heading, Pre, Pane, Card, Button } from "evergreen-ui";
import { storage } from "../..";
import { Song } from "../../types";
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadString,
} from "firebase/storage";
import { useQuery } from "react-query";
import { useFetchSong } from "../../hooks/useFetchSong";
import { StringLiteral } from "typescript";

interface SongViewProps {
  song: Song;
  setAlert: (status: null | "success" | "error") => void;
}

interface SongData {
  lyrics: string;
  chords: StringLiteral;
  isLoading: boolean;
  error: unknown;
}

const isSaving = (event: React.KeyboardEvent<HTMLPreElement>) =>
  (event.ctrlKey || event.metaKey) && event.key === "s";

export const SongView: FC<SongViewProps> = ({ song, setAlert }) => {
  const [editLyrics, setEditLyrics] = useState(false);
  const [editChords, setEditChords] = useState(false);
  const lyricsElement = useRef<HTMLPreElement>(null);
  const chordsElement = useRef<HTMLPreElement>(null);
  const [startTimeout, setStartTimeout] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const onSave = (
    source: "lyrics" | "chords",
    event?: React.KeyboardEvent<HTMLPreElement>
  ) => {
    setIsChanged(false);
    event?.preventDefault();
    const storeRef = ref(storage, `${source}/${song.filename}`);
    console.log("dupa");
    uploadString(
      storeRef,
      (source === "lyrics" ? lyricsElement : chordsElement).current
        ?.innerText ?? ""
    )
      .catch((e) => {
        console.error(e);
        setAlert("error");
        setStartTimeout(true);
      })
      .then(() => {
        setAlert("success");
        setStartTimeout(true);
      });
  };

  useEffect(() => {
    if (startTimeout) {
      const timer = setTimeout(() => {
        setAlert(null);
        setStartTimeout(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [startTimeout, setAlert]);

  const { lyrics, chords, isLoading, error } = useFetchSong(song.filename);

  if (error) {
    console.error(error);
    return <>Ups!, Something went wrong</>;
  }

  return (
    <>
      {isChanged && (
        <Button
          onClick={() => {
            onSave("lyrics");
            onSave("chords");
          }}
          position="absolute"
          top="30px"
          right="100px"
        >
          Save changes
        </Button>
      )}
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
                onBlur={() => {
                  setEditLyrics(false);
                }}
                onKeyDown={(event: React.KeyboardEvent<HTMLPreElement>) =>
                  isSaving(event) && onSave("lyrics", event)
                }
                onChange={() => {}}
              >
                {lyrics}
              </Pre>
              <Pre
                ref={chordsElement}
                style={chordsStyles}
                onClick={() => setEditChords(true)}
                contentEditable={editChords}
                onBlur={() => {
                  setEditChords(false);
                }}
                onKeyDown={(event: React.KeyboardEvent<HTMLPreElement>) =>
                  isSaving(event) && onSave("chords", event)
                }
                onChange={() => setIsChanged(true)}
              >
                {chords}
              </Pre>
            </>
          )}
        </Pane>
      </Card>
    </>
  );
};
