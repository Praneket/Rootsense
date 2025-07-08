// Replace config with yours from Firebase Console
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGNgzqDOtQ0ljmMIUl-uxiqYAh1JeT1Pw",
  authDomain: "rootsense-e5557.firebaseapp.com",
  projectId: "rootsense-e5557",
  storageBucket: "rootsense-e5557.firebasestorage.app",
  messagingSenderId: "1088832964488",
  appId: "1:1088832964488:web:db2eaea66395b47bfb5c3d"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db,auth };
