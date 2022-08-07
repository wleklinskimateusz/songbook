import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "..";

export const createStandardSignUp =
  (setError: (e: string) => void) => (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error: AuthError) => setError(error.message as string));
  };
