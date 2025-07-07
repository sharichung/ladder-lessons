import{initializeApp as L}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";import{GoogleAuthProvider as P,signInWithPopup as B,signOut as _,getAuth as I,onAuthStateChanged as k}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";import{doc as S,getDoc as T,setDoc as A,getFirestore as O}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";import{httpsCallable as j,getFunctions as $}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-functions.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();function C(){const s=document.getElementById("loading");s&&(s.style.display="flex")}function M(){const s=document.getElementById("loading");s&&(s.style.display="none")}function d(s,e="info",o=3e3){const n=document.createElement("div");n.className=`toast align-items-center text-white bg-${e} border-0 position-fixed bottom-0 end-0 m-4 shadow`,n.setAttribute("role","alert"),n.setAttribute("aria-live","assertive"),n.setAttribute("aria-atomic","true"),n.style.zIndex="1055",n.innerHTML=`
    <div class="d-flex">
      <div class="toast-body">${s}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `,document.body.appendChild(n),new bootstrap.Toast(n,{delay:o}).show(),n.addEventListener("hidden.bs.toast",()=>{n.remove()})}const R=new P;function H(){const s=document.getElementById("loginBtn"),e=document.getElementById("logoutBtn");s&&s.addEventListener("click",async()=>{try{const n=(await B(firebase.auth,R)).user,t=S(firebase.db,"users",n.uid);(await T(t)).exists()||await A(t,{email:n.email,name:n.displayName||"",role:"free",createdAt:new Date}),d("登入成功","success")}catch(o){console.error("登入失敗",o),d("登入失敗，請稍後再試","danger")}}),e&&e.addEventListener("click",async()=>{try{await _(firebase.auth),d("已登出","info")}catch(o){console.error("登出失敗",o),d("登出失敗","danger")}})}const N="modulepreload",U=function(s){return"/ladder-lessons/"+s},g={},f=function(e,o,n){let t=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),a=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));t=Promise.allSettled(o.map(c=>{if(c=U(c),c in g)return;g[c]=!0;const u=c.endsWith(".css"),w=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${w}`))return;const l=document.createElement("link");if(l.rel=u?"stylesheet":N,u||(l.as="script"),l.crossOrigin="",l.href=c,a&&l.setAttribute("nonce",a),document.head.appendChild(l),u)return new Promise((E,x)=>{l.addEventListener("load",E),l.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return t.then(i=>{for(const a of i||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};function b(s){s.innerHTML=`
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
  `;const e=document.getElementById("tryNowBtn"),o=document.getElementById("loginNowBtn");e==null||e.addEventListener("click",()=>{f(async()=>{const{navigateTo:n}=await Promise.resolve().then(()=>Z);return{navigateTo:n}},void 0).then(({navigateTo:n})=>{n("games")})}),o==null||o.addEventListener("click",()=>{var n;(n=document.getElementById("loginBtn"))==null||n.click()})}const D=(s,e,o)=>{const n=s[e];return n?typeof n=="function"?n():Promise.resolve(n):new Promise((t,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==o?". Note that variables only represent file names one level deep.":""))))})},y=[{id:"phonics-match",name:"拼音配對",module:"phonics-match",entry:"renderPhonicsMatch",type:"single",access:"free",description:"將字母與圖片配對，建立音素認知"},{id:"spelling-builder",name:"拼字遊戲",module:"spelling-builder",entry:"renderSpellingBuilder",type:"single",access:"pro",description:"拖放字母拼出單字，練習拼音與拼寫"},{id:"bingo",name:"聲音賓果",module:"bingo",entry:"renderBingoGame",type:"group",access:"pro",description:"聽音選字，完成一列賓果（多人互動）"}],q=Object.freeze(Object.defineProperty({__proto__:null,games:y},Symbol.toStringTag,{value:"Module"}));function z(s){const e=window.currentUser,o=window.userRole==="pro"||window.userRole==="group";s.innerHTML=`
    <section class="mb-5 text-center">
      <h1 class="display-5 fw-bold text-primary mb-3">選擇一個遊戲開始教學</h1>
      <p class="text-muted">所有遊戲皆可用於 Zoom 螢幕分享，無需學生裝置</p>
    </section>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="gameList"></div>
  `;const n=s.querySelector("#gameList");y.forEach(t=>{const r=t.access==="pro"&&!o,i=document.createElement("div");i.className="col";const a=document.createElement("div");a.className=`card h-100 shadow-sm border-0 ${r?"opacity-50":"hover-shadow"}`,a.style.cursor=r?"not-allowed":"pointer",a.innerHTML=`
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title text-primary fw-bold">${t.name}</h5>
          <p class="card-text text-muted small mb-2">${t.description||""}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <span class="badge bg-${t.type==="group"?"info":"secondary"}">
            ${t.type==="group"?"小組遊戲":"單人遊戲"}
          </span>
          ${r?'<span class="badge bg-warning text-dark">Pro 專屬</span>':""}
        </div>
      </div>
    `,r?a.addEventListener("click",()=>{d("這是 Pro 專屬遊戲，請升級帳戶以使用","warning"),m("subscription")}):a.addEventListener("click",()=>{D(Object.assign({"../games/gameRegistry.js":()=>f(()=>Promise.resolve().then(()=>q),void 0),"../games/phonics.js":()=>f(()=>import("./phonics-l0sNRNKZ.js"),[])}),`../games/${t.module}.js`,3).then(c=>{const u=document.getElementById("app");u.innerHTML="",c[t.entry](u,{user:e})})}),i.appendChild(a),n.appendChild(i)})}async function F(){return(await j(firebase.functions,"createCheckoutSession")()).data}function G(s){const e=window.currentUser,o=window.userRole||"free",n=o==="pro"||o==="group";s.innerHTML=`
    <section class="text-center py-5">
      <h1 class="display-5 fw-bold text-primary mb-3">帳戶與訂閱</h1>
      <p class="fs-5 text-muted mb-4">目前帳戶：<strong>${(e==null?void 0:e.email)||"未登入"}</strong></p>

      <div class="mb-4">
        <span class="badge bg-${n?"success":"secondary"} fs-6 px-3 py-2">
          ${n?"Pro 會員":"Free 免費方案"}
        </span>
      </div>

      ${n?'<p class="text-muted">你已解鎖所有遊戲與功能，感謝支持！</p>':`
        <p class="text-muted">升級為 Pro，解鎖所有拼字遊戲、錄音功能與小組班互動。</p>
        <button id="upgradeBtn" class="btn btn-primary btn-lg px-4">
          <i class="fa fa-star me-2"></i> 升級為 Pro
        </button>
      `}
    </section>
  `;const t=document.getElementById("upgradeBtn");t&&t.addEventListener("click",async()=>{try{t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span> 載入中...';const{url:r}=await F();window.location.href=r}catch(r){console.error("升級失敗",r),d("升級失敗，請稍後再試","danger"),t.disabled=!1,t.innerHTML='<i class="fa fa-star me-2"></i> 升級為 Pro'}})}function m(s){const e=document.getElementById("app");if(e)switch(e.innerHTML="",s){case"home":b(e);break;case"games":z(e);break;case"subscription":G(e);break;default:b(e)}}function h(){const s=window.currentUser,e=document.getElementById("loginBtn"),o=document.getElementById("logoutBtn");s?(e&&(e.style.display="none"),o&&(o.style.display="inline-block"),m("games")):(e&&(e.style.display="inline-block"),o&&(o.style.display="none"),m("home"))}const Z=Object.freeze(Object.defineProperty({__proto__:null,initRouter:h,navigateTo:m},Symbol.toStringTag,{value:"Module"})),V={apiKey:"AIzaSyA760A3u4jPGjq0verrZ1JpjYXnDJo4Ukg",authDomain:"ladder-lessons.firebaseapp.com",projectId:"ladder-lessons",storageBucket:"ladder-lessons.firebasestorage.app",messagingSenderId:"1012798746977",appId:"1:1012798746977:web:b239f0713b9d29fab79520"},p=L(V),v=I(p),J=O(p),K=$(p);window.firebase={app:p,auth:v,db:J,functions:K};window.currentUser=null;window.addEventListener("DOMContentLoaded",()=>{C(),H(),k(v,e=>{window.currentUser=e||null,h(),M()});const s=new URLSearchParams(window.location.search);s.get("checkout")==="success"&&d("付款成功，歡迎升級為 Pro！","success"),s.get("checkout")==="cancel"&&d("付款已取消","warning")});
