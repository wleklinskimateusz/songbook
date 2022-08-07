import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../..";

export const createStandardSignIn =
  (setError: (e: string) => void) => (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => console.log(userCredential.user))
      .catch((error) => setError(error));
  };
