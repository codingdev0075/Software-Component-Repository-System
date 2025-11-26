// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1ziCqaX6WkT2P_OyUSKBGtKPxST3lOcU",
  authDomain: "software-component-catal-823c5.firebaseapp.com",
  projectId: "software-component-catal-823c5",
  storageBucket: "software-component-catal-823c5.appspot.com",
  messagingSenderId: "771496529364",
  appId: "1:771496529364:web:d95513b63615e273905a41",
  measurementId: "G-3BPQMMQLDG"
};

export const componentStorageName = "components";
export const usersStorageName = "users";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
