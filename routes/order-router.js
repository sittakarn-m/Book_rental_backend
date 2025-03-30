const express = require("express");
const {
  getAllOnOrderRentals,
  updateStatus,
} = require("../controllers/order_controller");
const router = express.Router();

// @ENDPOINT http://localhost:8899/order

router.get("/", getAllOnOrderRentals);
router.patch("/:id", updateStatus);

module.exports = router;
