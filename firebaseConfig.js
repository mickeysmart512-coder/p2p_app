
// import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDDEvlR4txpH-u-gP7o_wTIUgYqtffqxfk",
//   authDomain: "p2p-app-ddc38.firebaseapp.com",
//   projectId: "p2p-app-ddc38",
//   storageBucket: "p2p-app-ddc38.appspot.com",
//   messagingSenderId: "876191930301",
//   appId: "1:876191930301:web:2790dc464a7406a13b64d4",
//   measurementId: "G-DCDW2K7X7X",
// };

// // Initialize Firebase App
// const FIREBASE_APP = initializeApp(firebaseConfig);

// // Initialize Firebase Auth with AsyncStorage persistence
// const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// // Initialize Firestore
// const FIREBASE_DB = getFirestore(FIREBASE_APP);

// export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB };



import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDEvlR4txpH-u-gP7o_wTIUgYqtffqxfk",
  authDomain: "p2p-app-ddc38.firebaseapp.com",
  projectId: "p2p-app-ddc38",
  storageBucket: "p2p-app-ddc38.appspot.com",
  messagingSenderId: "876191930301",
  appId: "1:876191930301:web:2790dc464a7406a13b64d4",
  measurementId: "G-DCDW2K7X7X",
};

// Initialize Firebase App
const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Optionally export `getAuth` for flexibility
const AUTH = getAuth(FIREBASE_APP);

// Initialize Firestore
const FIREBASE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB, AUTH };
