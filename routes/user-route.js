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
  removeBookOnCart,
} = require("../controllers/user-controller");
const { authCheck, adminCheck } = require("../middlewares/auth-middleware");

// Cart
router.get("/cart", authCheck, getUserCart);
router.post("/cart", authCheck, userCart);
router.delete("/cart", authCheck, emptyCart);

// User info
router.get("/me", authCheck, getMe);
router.post("/address", authCheck, saveAddress);
router.post("/order", authCheck, saveOrder);
router.get("/order", authCheck, getOrder);

module.exports = router;
