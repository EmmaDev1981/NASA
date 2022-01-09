// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB9MWglxIwIf93zSeIW7LQdy06AEsqHAL4",
  authDomain: "nasa-d1732.firebaseapp.com",
  projectId: "nasa-d1732",
  storageBucket: "nasa-d1732.appspot.com",
  messagingSenderId: "40223537879",
  appId: "1:40223537879:web:51649b21e40680804c8e92",
  measurementId: "G-96FGPZKV8P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Google Analytics
const analytics = getAnalytics(app);
logEvent(analytics, "notification_received");