// scripts/core/ui.js

// ✅ 顯示 loading spinner
export function showLoading() {
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "flex";
}

// ✅ 隱藏 loading spinner
export function hideLoading() {
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "none";
}

// ✅ 顯示 toast 訊息
export function showToast(message, type = "info", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${type} border-0 position-fixed bottom-0 end-0 m-4 shadow`;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.style.zIndex = "1055";

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  document.body.appendChild(toast);

  const bsToast = new bootstrap.Toast(toast, { delay: duration });
  bsToast.show();

  toast.addEventListener("hidden.bs.toast", () => {
    toast.remove();
  });
}

// ✅ 顯示 modal（預留接口）
export function showModal(title, bodyHTML) {
  // 可未來擴充：建立 Bootstrap Modal 元件
  alert(`${title}\n\n${bodyHTML}`);
}