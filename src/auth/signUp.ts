import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "..";

export const createStandardSignIn =
  (setError: (e: AuthError) => void) =>
  (email: string, password: string, username: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => setError(error));
  };
