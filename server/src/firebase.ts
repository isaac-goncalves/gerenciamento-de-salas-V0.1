
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjhAp4H51zkWcw07GpJJxHMP2v8yZ6B8g",
  authDomain: "gerenciamento-de-salas.firebaseapp.com",
  projectId: "gerenciamento-de-salas",
  storageBucket: "gerenciamento-de-salas.appspot.com",
  messagingSenderId: "826000981042",
  appId: "1:826000981042:web:8b5d1970dfc14a61bdd02b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);