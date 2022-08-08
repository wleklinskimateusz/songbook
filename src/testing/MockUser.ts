import { User } from "firebase/auth";

export const MockUser: User = {
  displayName: "Test Man",
  email: "mail@mail.com",
  phoneNumber: null,
  photoURL: null,
  providerId: "fsfs",
  uid: "fwfr",
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: "2020-01-01",
    lastSignInTime: "2020-01-01",
  },
  providerData: [],
  refreshToken: "fewfs",
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => "",
  getIdTokenResult: async () => ({
    expirationTime: "2020-01-01",
    authTime: "2020-01-01",
    issuedAtTime: "2020-01-01",
    signInProvider: "fsfs",
    token: "fsfs",
    signInSecondFactor: "fsfs",
    claims: {},
  }),
  reload: async () => {},
  toJSON: async () => ({}),
};
