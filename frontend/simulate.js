// simulate.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { faker } from "@faker-js/faker";

// Add Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAGNgzqDOtQ0ljmMIUl-uxiqYAh1JeT1Pw",
  authDomain: "rootsense-e5557.firebaseapp.com",
  projectId: "rootsense-e5557",
  storageBucket: "rootsense-e5557.firebasestorage.app",
  messagingSenderId: "1088832964488",
  appId: "1:1088832964488:web:db2eaea66395b47bfb5c3d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Utility: Random number in range
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Main loop
async function pushSensorData() {
  const data = {
    moisture: getRandom(30, 80),
    ph: (Math.random() * (8 - 5) + 5).toFixed(2),
    temperature: getRandom(20, 40),
    npk: getRandom(100, 400),
    timestamp: new Date().toISOString()
  };

  // Push to current
  await setDoc(doc(db, "sensors", "current"), data);

  // Log in history
  await addDoc(collection(db, "sensor_logs"), data);

  console.log("Pushed:", data);
}

// Push every 15 seconds
setInterval(pushSensorData, 15000);
