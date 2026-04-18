// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCceTL5gsIDpJnj6gVuTdK-x7L7EZ2kDRM",
    authDomain: "login-412e8.firebaseapp.com",
    projectId: "login-412e8",
    storageBucket: "login-412e8.firebasestorage.app",
    messagingSenderId: "394937645031",
    appId: "1:394937645031:web:54a4fa92575f17c04eef42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPORT THESE
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
