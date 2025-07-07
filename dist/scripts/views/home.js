// scripts/views/home.js

export function renderHome(container) {
  container.innerHTML = `
    <section class="text-center py-5">
      <h1 class="display-4 fw-bold text-primary mb-3">Ladder Lessons</h1>
      <p class="fs-4 text-muted mb-4">
        Interactive Phonics Made Simple for Teachers<br />
        Perfect for Zoom Classes. No student devices needed.
      </p>

      <div class="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        <button id="tryNowBtn" class="btn btn-primary btn-lg px-4">
          <i class="fa fa-play me-2"></i>立即試玩
        </button>
        <button id="loginNowBtn" class="btn btn-outline-secondary btn-lg px-4">
          <i class="fa fa-user me-2"></i>登入 / 註冊
        </button>
      </div>

      <p class="text-muted small">
        Free forever plan available • No credit card required
      </p>
    </section>

    <section class="row text-start mt-5">
      <div class="col-md-6 mb-4">
        <h3 class="h5 text-primary"><i class="fa fa-video me-2"></i> Zoom-Optimized</h3>
        <p class="text-muted">Perfect for screen sharing during live classes. Teacher controls everything while students watch and learn.</p>
      </div>
      <div class="col-md-6 mb-4">
        <h3 class="h5 text-primary"><i class="fa fa-gamepad me-2"></i> Interactive Games</h3>
        <p class="text-muted">Engaging matching and spelling games that make phonics fun and memorable for young learners.</p>
      </div>
      <div class="col-md-6 mb-4">
        <h3 class="h5 text-primary"><i class="fa fa-volume-up me-2"></i> Audio-Rich Learning</h3>
        <p class="text-muted">IPA-based pronunciation, phonics songs, and clear audio feedback for every sound and word.</p>
      </div>
      <div class="col-md-6 mb-4">
        <h3 class="h5 text-primary"><i class="fa fa-layer-group me-2"></i> Progressive Structure</h3>
        <p class="text-muted">Carefully sequenced sound groups that build upon each other for systematic phonics instruction.</p>
      </div>
    </section>
  `;

  // ✅ 綁定按鈕事件
  const tryNowBtn = document.getElementById("tryNowBtn");
  const loginNowBtn = document.getElementById("loginNowBtn");

  tryNowBtn?.addEventListener("click", () => {
    import("../core/router.js").then(({ navigateTo }) => {
      navigateTo("games");
    });
  });

  loginNowBtn?.addEventListener("click", () => {
    document.getElementById("loginBtn")?.click();
  });
}
