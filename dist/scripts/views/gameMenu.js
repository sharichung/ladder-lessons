// scripts/views/gameMenu.js

import { games } from "../games/gameRegistry.js";
import { showToast } from "../core/ui.js";
import { navigateTo } from "../core/router.js";

export function renderGameMenu(container) {
  const user = window.currentUser;
  const isPro = window.userRole === "pro" || window.userRole === "group";

  container.innerHTML = `
    <section class="mb-5 text-center">
      <h1 class="display-5 fw-bold text-primary mb-3">選擇一個遊戲開始教學</h1>
      <p class="text-muted">所有遊戲皆可用於 Zoom 螢幕分享，無需學生裝置</p>
    </section>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="gameList"></div>
  `;

  const gameList = container.querySelector("#gameList");

  games.forEach(game => {
    const locked = game.access === "pro" && !isPro;

    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = `card h-100 shadow-sm border-0 ${locked ? "opacity-50" : "hover-shadow"}`;
    card.style.cursor = locked ? "not-allowed" : "pointer";

    card.innerHTML = `
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title text-primary fw-bold">${game.name}</h5>
          <p class="card-text text-muted small mb-2">${game.description || ""}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <span class="badge bg-${game.type === "group" ? "info" : "secondary"}">
            ${game.type === "group" ? "小組遊戲" : "單人遊戲"}
          </span>
          ${locked ? `<span class="badge bg-warning text-dark">Pro 專屬</span>` : ""}
        </div>
      </div>
    `;

    if (!locked) {
      card.addEventListener("click", () => {
        import(`../games/${game.module}.js`).then(mod => {
          const app = document.getElementById("app");
          app.innerHTML = "";
          mod[game.entry](app, { user });
        });
      });
    } else {
      card.addEventListener("click", () => {
        showToast("這是 Pro 專屬遊戲，請升級帳戶以使用", "warning");
        navigateTo("subscription");
      });
    }

    col.appendChild(card);
    gameList.appendChild(col);
  });
}
