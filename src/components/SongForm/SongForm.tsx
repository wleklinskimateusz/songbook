import React, { FC, useState } from "react";

import { SideSheet, Button, Heading, Pane, TextInputField } from "evergreen-ui";
import { Song } from "../../types";

type Props = {
  editedSong?: Song;
  isShown: boolean;
  setIsShown: (state: boolean) => void;
};

export const SongForm: FC<Props> = ({ editedSong, setIsShown, isShown }) => {
  return (
    <>
      <SideSheet isShown={isShown} onCloseComplete={() => setIsShown(false)}>
        <Heading margin={40}>
          {editedSong ? `Edit ${editedSong.title}` : "Create new Song"}
        </Heading>
        <Pane
          display="flex"
          flexDirection="column"
          margin="1rem"
          padding="1rem"
        >
          <TextInputField
            label="A title of the song"
            required
            placeholder="Select the title"
          />
          <TextInputField
            label="An author of a song"
            required
            placeholder="Select the author"
          />
        </Pane>
      </SideSheet>
    </>
  );
};
