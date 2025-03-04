const express = require("express");
const { listUsers, changeStatus, changeRole } = require("../controllers/admin-controller");
const { authCheck, adminCheck } = require("../middlewares/auth-middleware");
const {} = require('../controllers/admin-controller')
const router = express.Router();

router.put("/change-status", authCheck, adminCheck, changeStatus);
router.put("/change-role", authCheck, adminCheck, changeRole);
router.get("/users", authCheck, adminCheck, listUsers);

module.exports = router;
