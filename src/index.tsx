import React from "react";
import ReactDOM from "react-dom/client";
import GlobalCSS from "./global.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

const firebaseConfig = {
  apiKey: "AIzaSyAomkfNe-8YjmnIfsLJI9Fw6rqncigW9iY",
  authDomain: "songbook-eea4b.firebaseapp.com",
  projectId: "songbook-eea4b",
  storageBucket: "songbook-eea4b.appspot.com",
  messagingSenderId: "540721659836",
  appId: "1:540721659836:web:f1af7162373a61f6e235b9",
  measurementId: "G-KEJ9S28JRV",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalCSS />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
