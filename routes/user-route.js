const express = require("express");
const router = express.Router();
const {
  getOrder,
  saveOrder,
  emptyCart,
  userCart,
  saveAddress,
  getMe,
  getUserCart,
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  checkout,
} = require("../controllers/user-controller");
const { authCheck } = require("../middlewares/auth-middleware");

// Cart
router.get("/cart", authCheck, getCart);
router.post("/cart", authCheck, addToCart);
router.put("/cart", authCheck, updateCartItem);
router.delete("/cart", authCheck, removeFromCart);
router.post("/checkout", authCheck, checkout);

// User info
router.get("/me", authCheck, getMe);
router.post("/address", authCheck, saveAddress);

module.exports = router;
