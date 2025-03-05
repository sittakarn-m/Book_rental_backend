const express = require("express");
const { listUsers, changeStatus, changeRole } = require("../controllers/admin-controller");
const { authCheck, adminCheck } = require("../middlewares/auth-middleware");
const router = express.Router();

// User managenment
router.put("/change-status", authCheck, adminCheck, changeStatus);
router.put("/change-role", authCheck, adminCheck, changeRole);

router.get("/users", authCheck, adminCheck, listUsers);
router.get("/user/:userId", authCheck, adminCheck, listUsers);

// Order Management
router.put('/order-status',authCheck)
router.get('/orders',authCheck)




module.exports = router;
