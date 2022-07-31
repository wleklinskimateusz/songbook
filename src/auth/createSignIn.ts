import { AuthError, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "..";

export const createSignIn = (setError: (e: AuthError) => void) => () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error: AuthError) => {
      setError(error);
    });
};
