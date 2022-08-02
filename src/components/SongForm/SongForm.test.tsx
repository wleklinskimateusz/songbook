import React from "react";
import { render, screen } from "@testing-library/react";
import { SongForm } from "./SongForm";

describe("SongForm", () => {
  it("render component correctly", () => {
    render(
      <SongForm isShown={true} setAlert={() => {}} setIsShown={() => {}} />
    );
    const titleInput = screen.getByPlaceholderText("Select the title");
    const artistInput = screen.getByPlaceholderText("Select the artist");
    const fileInput = screen.getByPlaceholderText("Select filename");
    const submitButton = screen.getByText("Create");
    expect(titleInput).toBeInTheDocument();
    expect(artistInput).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
