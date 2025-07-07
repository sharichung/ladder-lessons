// scripts/core/auth.js

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { showToast } from "./ui.js";

const provider = new GoogleAuthProvider();

// ✅ 初始化登入按鈕事件
export function initAuth() {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(firebase.auth, provider);
        const user = result.user;

        // ✅ 寫入 Firestore 使用者資料
        const userRef = doc(firebase.db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            name: user.displayName || "",
            role: "free",
            createdAt: new Date(),
          });
        }

        showToast("登入成功", "success");
      } catch (err) {
        console.error("登入失敗", err);
        showToast("登入失敗，請稍後再試", "danger");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(firebase.auth);
        showToast("已登出", "info");
      } catch (err) {
        console.error("登出失敗", err);
        showToast("登出失敗", "danger");
      }
    });
  }
}