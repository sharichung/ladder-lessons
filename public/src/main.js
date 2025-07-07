// src/main.js

// ✅ Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getFunctions } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-functions.js";

// ✅ Core modules (inside src/core/)
import { initAuth } from "./core/auth.js";
import { initRouter, navigateTo } from "./core/router.js";
import { showLoading, hideLoading, showToast } from "./core/ui.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA760A3u4jPGjq0verrZ1JpjYXnDJo4Ukg",
  authDomain: "ladder-lessons.firebaseapp.com",
  projectId: "ladder-lessons",
  storageBucket: "ladder-lessons.firebasestorage.app",
  messagingSenderId: "1012798746977",
  appId: "1:1012798746977:web:b239f0713b9d29fab79520"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// ✅ Global variables
window.firebase = { app, auth, db, functions };
window.currentUser = null;

// ✅ On page load
window.addEventListener("DOMContentLoaded", () => {
  showLoading();

  initAuth();

  onAuthStateChanged(auth, user => {
    window.currentUser = user || null;
    initRouter();
    hideLoading();
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get("checkout") === "success") {
    showToast("付款成功，歡迎升級為 Pro！", "success");
  }
  if (params.get("checkout") === "cancel") {
    showToast("付款已取消", "warning");
  }
});
