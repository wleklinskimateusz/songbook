import { auth } from "..";

// Here we'll put everything we want to do after logout
export const createSignOut = () => () => {
  auth.signOut();
};
