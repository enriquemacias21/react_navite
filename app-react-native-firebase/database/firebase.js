// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore }  from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCrHn_whXfU44ySNYn_y3fSIqKZHJTqURY",
  authDomain: "app-reactnanite-firebase.firebaseapp.com",
  projectId: "app-reactnanite-firebase",
  storageBucket: "app-reactnanite-firebase.appspot.com",
  messagingSenderId: "392513638435",
  appId: "1:392513638435:web:d2eccf27cb77d564aa2196"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }
