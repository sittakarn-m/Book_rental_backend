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

// @ENDPOINT http://localhost:8899/user

// Cart
router.get("/cart", getCart);
router.post("/cart" , addToCart);
router.put("/cart" , updateCartItem);
router.delete("/cart/:itemId", removeFromCart);
router.post("/checkout", checkout);

// User info
router.get("/me", authCheck, getMe);
router.post("/address", authCheck, saveAddress);

module.exports = router;
