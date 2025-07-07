// scripts/views/subscription.js

import { createCheckoutSession } from "../core/billing.js";
import { showToast } from "../core/ui.js";

export function renderSubscription(container) {
  const user = window.currentUser;
  const role = window.userRole || "free";

  const isPro = role === "pro" || role === "group";

  container.innerHTML = `
    <section class="text-center py-5">
      <h1 class="display-5 fw-bold text-primary mb-3">帳戶與訂閱</h1>
      <p class="fs-5 text-muted mb-4">目前帳戶：<strong>${user?.email || "未登入"}</strong></p>

      <div class="mb-4">
        <span class="badge bg-${isPro ? "success" : "secondary"} fs-6 px-3 py-2">
          ${isPro ? "Pro 會員" : "Free 免費方案"}
        </span>
      </div>

      ${
        isPro
          ? `<p class="text-muted">你已解鎖所有遊戲與功能，感謝支持！</p>`
          : `
        <p class="text-muted">升級為 Pro，解鎖所有拼字遊戲、錄音功能與小組班互動。</p>
        <button id="upgradeBtn" class="btn btn-primary btn-lg px-4">
          <i class="fa fa-star me-2"></i> 升級為 Pro
        </button>
      `
      }
    </section>
  `;

  const upgradeBtn = document.getElementById("upgradeBtn");
  if (upgradeBtn) {
    upgradeBtn.addEventListener("click", async () => {
      try {
        upgradeBtn.disabled = true;
        upgradeBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> 載入中...`;
        const { url } = await createCheckoutSession();
        window.location.href = url;
      } catch (err) {
        console.error("升級失敗", err);
        showToast("升級失敗，請稍後再試", "danger");
        upgradeBtn.disabled = false;
        upgradeBtn.innerHTML = `<i class="fa fa-star me-2"></i> 升級為 Pro`;
      }
    });
  }
}
