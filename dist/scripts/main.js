// scripts/main.js

// ✅ 初始化 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getFunctions } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-functions.js";

// ✅ 匯入核心模組
import { initAuth } from "./core/auth.js";
import { initRouter, navigateTo } from "./core/router.js";
import { showLoading, hideLoading, showToast } from "./core/ui.js";

// ✅ Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyA760A3u4jPGjq0verrZ1JpjYXnDJo4Ukg",
  authDomain: "ladder-lessons.firebaseapp.com",
  projectId: "ladder-lessons",
  storageBucket: "ladder-lessons.firebasestorage.app",
  messagingSenderId: "1012798746977",
  appId: "1:1012798746977:web:b239f0713b9d29fab79520"
};

// ✅ 初始化 Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// ✅ 全域變數
window.firebase = { app, auth, db, functions };
window.currentUser = null;

// ✅ 當頁面載入時
window.addEventListener("DOMContentLoaded", () => {
  showLoading();

  // 初始化登入邏輯
  initAuth();

  // 監聽登入狀態
  onAuthStateChanged(auth, user => {
    window.currentUser = user || null;
    initRouter(); // 根據登入狀態載入對應頁面
    hideLoading();
  });

  // ✅ 處理 Stripe Checkout 回傳結果
  const params = new URLSearchParams(window.location.search);
  if (params.get("checkout") === "success") {
    showToast("付款成功，歡迎升級為 Pro！", "success");
  }
  if (params.get("checkout") === "cancel") {
    showToast("付款已取消", "warning");
  }
});
