// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvdcRcrdkQ2Q7kWN854pYFLaLt4i8BMes",
  authDomain: "ai-career-matching.firebaseapp.com",
  projectId: "ai-career-matching",
  storageBucket: "ai-career-matching.firebasestorage.app",
  messagingSenderId: "663849615430",
  appId: "1:663849615430:web:4adc016e67db662646ca47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);