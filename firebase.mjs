import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZtj1SiCa0uTn0YzljekUv_Q3cVg2wn-M",
  authDomain: "spot-me-ae6e9.firebaseapp.com",
  projectId: "spot-me-ae6e9",
  storageBucket: "spot-me-ae6e9.firebasestorage.app",
  messagingSenderId: "392297730173",
  appId: "1:392297730173:web:98dc013d293b06c0456114",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };