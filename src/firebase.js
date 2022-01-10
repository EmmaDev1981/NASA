// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey:`${process.env.REACT_APP_APIKEY}`,
  authDomain:`${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId:`${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket:`${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId:`${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId:`${process.env.REACT_APP_APP_ID}`,
  measurementId:`${process.env.REACT_APP_MEASUREMENT_ID}`,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Google Analytics
const analytics = getAnalytics(app);
logEvent(analytics, "notification_received");