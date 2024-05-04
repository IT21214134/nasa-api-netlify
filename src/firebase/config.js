// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuQX2ZTjtYsvEhFmgNU3EEOeixQbtb-Bw",
  authDomain: "nasa-app-4a706.firebaseapp.com",
  projectId: "nasa-app-4a706",
  storageBucket: "nasa-app-4a706.appspot.com",
  messagingSenderId: "380903411367",
  appId: "1:380903411367:web:b73ca8d5a132bcde801582"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);