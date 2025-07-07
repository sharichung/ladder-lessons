// scripts/core/router.js

import { renderHome } from "../views/home.js";
import { renderGameMenu } from "../views/gameMenu.js";
import { renderSubscription } from "../views/subscription.js";

let currentView = null;

// ✅ 切換頁面
export function navigateTo(viewName) {
  const app = document.getElementById("app");
  if (!app) return;

  // 清空畫面
  app.innerHTML = "";

  // 根據 viewName 載入對應頁面
  switch (viewName) {
    case "home":
      renderHome(app);
      break;
    case "games":
      renderGameMenu(app);
      break;
    case "subscription":
      renderSubscription(app);
      break;
    default:
      renderHome(app);
  }

  currentView = viewName;
}

// ✅ 初始化 router（由 main.js 呼叫）
export function initRouter() {
  const user = window.currentUser;

  // 控制登入 / 登出按鈕顯示
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    navigateTo("games"); // 登入後進入遊戲選單
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
    navigateTo("home"); // 未登入顯示首頁
  }
}