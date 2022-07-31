import { ref, uploadString } from "firebase/storage";
import { AlertStatus } from "../../types";
import { storage } from "../..";
import { Song } from "../../types";

// It's an arrow function that creates another arrow function
export const createOnSave =
  (
    song: Song,
    setIsChanged: (val: boolean) => void,
    setAlert: (status: AlertStatus) => void,
    lyricsElement: React.RefObject<HTMLPreElement>,
    chordsElement: React.RefObject<HTMLPreElement>,
    setStartTimeout: (val: boolean) => void
  ) =>
  (
    source: "lyrics" | "chords",
    event?: React.KeyboardEvent<HTMLPreElement>
  ) => {
    setIsChanged(false);
    event?.preventDefault();
    const storeRef = ref(storage, `${source}/${song.filename}`);
    console.log("dupa");
    uploadString(
      storeRef,
      (source === "lyrics" ? lyricsElement : chordsElement).current
        ?.innerText ?? ""
    )
      .catch((e) => {
        console.error(e);
        setAlert(AlertStatus.Error);
        setStartTimeout(true);
      })
      .then(() => {
        setAlert(AlertStatus.Success);
        setStartTimeout(true);
      });
  };
