import { createGoogleSignIn, createStandardSignIn } from "./signIn";

export const createSignIn = (setError: (e: string) => void) => {
  const googleSignIn = createGoogleSignIn(setError);
  const standardSignIn = createStandardSignIn(setError);

  return { googleSignIn, standardSignIn };
};
