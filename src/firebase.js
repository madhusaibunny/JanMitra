import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKPyDQ_OqNEpF7lqfSBziCD9P13ZGOmJw",
  authDomain: "janamitra-fad4a.firebaseapp.com",
  projectId: "janamitra-fad4a",
  storageBucket: "janamitra-fad4a.firebasestorage.app",
  messagingSenderId: "203451200035",
  appId: "1:203451200035:web:b5bdeaf605ab581ddbb796",
  measurementId: "G-MRRZGZ51X1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics, auth, db };
