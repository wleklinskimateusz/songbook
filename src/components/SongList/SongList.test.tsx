import React, { useState } from "react";
import { render, screen, act } from "@testing-library/react";
import { SongList } from "./SongList";
import { Song } from "../../types";

const Container = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  return (
    <SongList
      setSelected={() => {}}
      onAdd={() =>
        act(() => {
          setSongs([
            ...songs,
            {
              title: "Test Song",
              artist: "Remeo",
              filename: "test.txt",
              id: Math.floor(Math.random()).toString(),
            },
          ]);
        })
      }
      fetchedSongs={{
        isLoading: false,
        isError: false,
        songs,
      }}
    />
  );
};

describe("SongList", () => {
  it("render component correctly", async () => {
    render(<Container />);

    const addButtonWrapper = screen.getByTestId("add-song");
    expect(addButtonWrapper).toBeInTheDocument();
    const addButton = addButtonWrapper.childNodes[0] as HTMLButtonElement;
    expect(addButton).toBeInTheDocument();
    addButton.click();
    const testSong = await screen.findByText("Test Song");
    expect(testSong).toBeInTheDocument();
  });
});
