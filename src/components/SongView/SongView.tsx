import React, { FC, useEffect, useRef, useState } from "react";

import {
  containerStyles,
  titleStyles,
  lyricsStyles,
  chordsStyles,
} from "./styles";

import { Heading, Pre, Pane, Card, Button } from "evergreen-ui";
import { Song, AlertStatus } from "../../types";
import { useHandleAlert, useFetchSong, useCheckChanges } from "../../hooks";
import { createOnSave } from "./createOnSave";

interface SongViewProps {
  song: Song;
  setAlert: (status: AlertStatus) => void;
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

  const onSave = createOnSave(
    song,
    setIsChanged,
    setAlert,
    lyricsElement,
    chordsElement,
    setStartTimeout
  );
  const { lyrics, chords, isLoading, error } = useFetchSong(song.filename);

  useHandleAlert(startTimeout, setStartTimeout, setAlert);
  useCheckChanges(lyrics, chords, setIsChanged, lyricsElement, chordsElement);

  useEffect(() => {
    setIsChanged(false);
  }, [isLoading]);

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
                onChange={() => setIsChanged(true)}
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
