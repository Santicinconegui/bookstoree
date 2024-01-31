import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAT5x1As96OIxAjC47WUgCItajAGjDrjCY",
  authDomain: "book-store-87ce5.firebaseapp.com",
  projectId: "book-store-87ce5",
  storageBucket: "book-store-87ce5.appspot.com",
  messagingSenderId: "344779295813",
  appId: "1:344779295813:web:2444ef30fe40d8c505272c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
