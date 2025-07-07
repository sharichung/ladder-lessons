// functions/stripe/createCheckoutSession.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  if (!uid) throw new functions.https.HttpsError("unauthenticated", "請先登入");

  const userRef = admin.firestore().collection("users").doc(uid);
  const userSnap = await userRef.get();
  const userData = userSnap.data();

  // ✅ 建立 Stripe Customer（如尚未存在）
  let customerId = userData?.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: userData?.email || "",
      metadata: { firebaseUID: uid }
    });
    customerId = customer.id;
    await userRef.set({ stripeCustomerId: customerId }, { merge: true });
  }

  // ✅ 建立 Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: customerId,
    line_items: [
      {
        price: "price_1RiCovG4B1qaGMZs43tsvMOz", // ✅ 你的 Pro 價格 ID
        quantity: 1
      }
    ],
    allow_promotion_codes: true,
    success_url: "https://sharichung.github.io/ladder-lessons/?checkout=success",
    cancel_url: "https://sharichung.github.io/ladder-lessons/?checkout=cancel"
  });

  return { url: session.url };
});
