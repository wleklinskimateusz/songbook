import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "..";

export const createStandardSignUp =
  (setError: (e: string) => void) => (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error: AuthError) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Email already in use");
            break;

          default:
            setError(error.message);
        }
      });
  };
