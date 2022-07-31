import React, { useEffect } from "react";

export const useCheckChanges = (
  lyrics: string | null,
  chords: string | null,
  setIsChanged: (val: boolean) => void,
  lyricsElement: React.RefObject<HTMLPreElement>,
  chordsElement: React.RefObject<HTMLPreElement>
) => {
  useEffect(() => {
    if (!lyrics || !chords) {
      setIsChanged(false);
      return;
    }
    if (
      lyrics !== lyricsElement.current?.innerText ||
      chords !== chordsElement.current?.innerText
    ) {
      setIsChanged(true);
    }
  }, [
    lyrics,
    lyricsElement.current?.innerText,
    chords,
    chordsElement.current?.innerText,
    setIsChanged,
    lyricsElement,
    chordsElement,
  ]);
};
