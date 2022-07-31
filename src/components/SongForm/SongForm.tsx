import React, { FC, useState } from "react";

import { SideSheet, Button, Heading, Pane, TextInputField } from "evergreen-ui";
import { getAuth } from "firebase/auth";

import { AlertStatus } from "../../types";
import { useHandleAlert } from "../../hooks";
import { createAddSong } from "./createAddSong";
import { formContainerStyles } from "./style";

type Props = {
  isShown: boolean;
  setIsShown: (state: boolean) => void;
  setAlert: (state: AlertStatus) => void;
};

export const SongForm: FC<Props> = ({ setIsShown, isShown, setAlert }) => {
  const auth = getAuth();
  const [title, setTitle] = useState<string | null>(null);
  const [artist, setArtist] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [startTimeout, setStartTimeout] = useState(false);

  const addSong = createAddSong(
    filename,
    auth,
    title,
    artist,
    setAlert,
    setStartTimeout
  );
  useHandleAlert(startTimeout, setStartTimeout, setAlert);
  return (
    <>
      <SideSheet isShown={isShown} onCloseComplete={() => setIsShown(false)}>
        <Heading margin={40}>"Create new Song"</Heading>
        <Pane style={formContainerStyles}>
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
              isInvalid={filename?.includes(" ")}
              validationMessage={
                filename?.includes(" ") && "Filename cannot contain spaces"
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
