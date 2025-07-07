// scripts/core/billing.js

import { httpsCallable } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-functions.js";

export async function createCheckoutSession() {
  const fn = httpsCallable(firebase.functions, "createCheckoutSession");
  const result = await fn();
  return result.data;
}
