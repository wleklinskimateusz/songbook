import { getDocs, collection } from "firebase/firestore";
import { db } from "..";
import { useQuery } from "react-query";
import { Song } from "../types";

export const useFetchSongList = () => {
  const { data, isLoading, isError } = useQuery("songs", async () => {
    const querySnapshot = await getDocs(collection(db, "songs"));
    const output: Song[] = [];
    querySnapshot.forEach((doc) => {
      output.push({
        id: doc.id,
        ...doc.data(),
      } as Song);
    });
    return output;
  });
  return { songs: data, isLoading, isError };
};
