import React from "react";
import { render, screen } from "@testing-library/react";
import { SongList } from "./SongList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

describe("SongList", () => {
  it("render component correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SongList
          setSelected={() => {}}
          onAdd={() => {}}
          fetchedSongs={{
            isLoading: false,
            isError: false,
            songs: [
              {
                id: "0",
                title: "Hello, Hello",
                artist: "Me",
                rating: 5,
                filename: "hello.mp3",
              },
              {
                id: "1",
                title: "Oh my God",
                artist: "Yololo",
                rating: 4,
                filename: "oh-my-god.mp3",
              },
              {
                id: "2",
                title: "Hihih",
                artist: "hahahaha",
                rating: 3,
                filename: "hihih.mp3",
              },
            ],
          }}
        />
      </QueryClientProvider>
    );

    const addButton = screen.getByText("Add song");
    expect(addButton).toBeInTheDocument();
  });
});
