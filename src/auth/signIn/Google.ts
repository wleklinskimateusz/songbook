import { AuthError, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../..";

export const createGoogleSignIn = (setError: (e: string) => void) => () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error: AuthError) => {
      setError(error.message);
    });
};
