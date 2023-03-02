import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { globalStyles } from "../src/commons/styles/globalStyles";
import ApolloSetting from "../src/components/commons/apollo";
import Layout from "../src/components/commons/layout";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz9DX69ECcisIx_6S9zKJJbJQPt5t-Rsc",
  authDomain: "web-test-eb64d.firebaseapp.com",
  projectId: "web-test-eb64d",
  storageBucket: "web-test-eb64d.appspot.com",
  messagingSenderId: "881566615946",
  appId: "1:881566615946:web:7b9255127f8c44a9026073",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloSetting>
      <Global styles={globalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloSetting>
  );
}
