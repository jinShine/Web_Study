// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const collections = {
  admins: "admins",
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

const db = getFirestore(app);

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Login User : ", user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Login Error", errorCode, errorMessage);
    });
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : user;
    console.log(updatedUser);
    callback(updatedUser);
  });
}

async function adminUser(user) {
  const querySnapshot = await getDocs(collection(db, collections.admins));
  let isAdmin = false;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    isAdmin = data.uids.includes(user.uid);
  });

  return { ...user, isAdmin };
}
