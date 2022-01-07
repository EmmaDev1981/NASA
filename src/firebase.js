// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9MWglxIwIf93zSeIW7LQdy06AEsqHAL4",
  authDomain: "nasa-d1732.firebaseapp.com",
  projectId: "nasa-d1732",
  storageBucket: "nasa-d1732.appspot.com",
  messagingSenderId: "40223537879",
  appId: "1:40223537879:web:51649b21e40680804c8e92",
  measurementId: "G-96FGPZKV8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    return user
  })

}