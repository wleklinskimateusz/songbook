import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "..";

export const useFetchSong = (filename: string) => {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [chords, setChords] = useState<string | null>(null);
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(true);
  const [isLoadingChords, setIsLoadingChords] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const isLoading = isLoadingChords || isLoadingLyrics;
  useEffect(() => {
    setIsLoadingChords(true);
    setIsLoadingLyrics(true);
    const lyricsRef = ref(storage, `lyrics/${filename}`);
    const chordsRef = ref(storage, `chords/${filename}`);
    const fetchData = (
      setData: (data: string) => void,
      setIsLoading: (status: boolean) => void,
      ref: StorageReference
    ) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "text";
      xhr.onload = async () => {
        try {
          const data = await xhr.response;
          setData(data);
          setIsLoading(false);
        } catch (e) {
          setError(e);
        }
      };
      getDownloadURL(ref)
        .then((result) => {
          const url = result;
          xhr.open("GET", url);
          xhr.send();
        })
        .catch((e) => {
          setError(e);
        });
    };
    fetchData(setLyrics, setIsLoadingLyrics, lyricsRef);
    fetchData(setChords, setIsLoadingChords, chordsRef);
  }, [filename]);

  return { lyrics, chords, isLoading, error };
};
