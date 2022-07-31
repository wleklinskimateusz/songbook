import { Auth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { AlertStatus, Song } from "../../types";
import { db } from "../..";
import { queryClient } from "../..";

export const createAddSong =
  (
    filename: string,
    auth: Auth,
    title: string,
    artist: string,
    setAlert: (status: AlertStatus) => void,
    setStartTimeout: (val: boolean) => void
  ) =>
  async () => {
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
      setAlert(AlertStatus.Error);
      setStartTimeout(true);
    } finally {
      queryClient.refetchQueries("songs");
      setAlert(AlertStatus.Success);
      setStartTimeout(true);
    }
  };
