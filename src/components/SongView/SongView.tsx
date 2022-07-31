import React, { FC, useEffect, useRef, useState } from "react";

import {
  containerStyles,
  titleStyles,
  lyricsStyles,
  chordsStyles,
  saveButtonStyles,
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

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  });
  if (!song.filename) return <>No data</>;

  return (
    <>
      {isChanged && (
        <Button
          onClick={() => {
            onSave("lyrics");
            onSave("chords");
          }}
          style={saveButtonStyles}
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
                onBlur={() => setEditLyrics(false)}
                onKeyDown={(event: React.KeyboardEvent<HTMLPreElement>) =>
                  isSaving(event) && onSave("lyrics", event)
                }
                onChange={() => setIsChanged(true)}
              >
                {lyrics ?? (
                  <span style={{ color: "whitesmoke", fontStyle: "italic" }}>
                    Enter Some Lyrics here
                  </span>
                )}
              </Pre>
              <Pre
                ref={chordsElement}
                style={chordsStyles}
                onClick={() => setEditChords(true)}
                contentEditable={editChords}
                onBlur={() => setEditChords(false)}
                onKeyDown={(event: React.KeyboardEvent<HTMLPreElement>) =>
                  isSaving(event) && onSave("chords", event)
                }
                onChange={() => setIsChanged(true)}
              >
                {chords ?? (
                  <span
                    contentEditable={false}
                    style={{ color: "whitesmoke", fontStyle: "italic" }}
                  >
                    Enter Chords Here
                  </span>
                )}
              </Pre>
            </>
          )}
        </Pane>
      </Card>
    </>
  );
};
