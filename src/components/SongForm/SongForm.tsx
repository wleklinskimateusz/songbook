import React, { FC, useState } from "react";

import { SideSheet, Button, Heading, Pane, TextInputField } from "evergreen-ui";
import { Song } from "../../types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../..";
import { getAuth } from "firebase/auth";
import { queryClient } from "../../";

import {} from "react-query";

type Props = {
  isShown: boolean;
  setIsShown: (state: boolean) => void;
};

export const SongForm: FC<Props> = ({ setIsShown, isShown }) => {
  const auth = getAuth();
  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const addSong = async () => {
    try {
      const newSong: Song = {
        title,
        artist,
        filename: filename.endsWith(".txt") ? filename : filename + ".txt",
        addedBy: auth.currentUser?.uid,
      };
      await addDoc(collection(db, "songs"), newSong);
    } catch (e) {
      console.error("Error adding the document: ", e);
    } finally {
      queryClient.refetchQueries("songs");
      alert("Done");
    }
  };
  return (
    <>
      <SideSheet isShown={isShown} onCloseComplete={() => setIsShown(false)}>
        <Heading margin={40}>"Create new Song"</Heading>
        <Pane
          display="flex"
          flexDirection="column"
          margin="1rem"
          padding="1rem"
        >
          <form
            onSubmit={async (event: React.FormEvent) => {
              event.preventDefault();
              setIsShown(false);
              addSong();
            }}
          >
            <TextInputField
              label="A title of the song"
              required
              placeholder="Select the title"
              onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
            />
            <TextInputField
              label="An author of a song"
              required
              placeholder="Select the artist"
              onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                setArtist(event.target.value)
              }
            />
            <TextInputField
              label="Filename for the song"
              required
              placeholder="Select filename"
              isInvalid={filename.includes(" ")}
              validationMessage={
                filename.includes(" ") && "Filename cannot contain spaces"
              }
              onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                setFilename(event.target.value)
              }
            />
            <Button type="submit">Create</Button>
          </form>
        </Pane>
      </SideSheet>
    </>
  );
};
