import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDxTy0o0Bl17w_W6xxT3vhxk7-i2tOgeSo",
  authDomain: "react-aploude-img.firebaseapp.com",
  projectId: "react-aploude-img",
  storageBucket: "react-aploude-img.appspot.com",
  messagingSenderId: "716255859052",
  appId: "1:716255859052:web:819c018c034adf8491a349",
  measurementId: "G-17M36FX04R",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
