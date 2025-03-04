const express = require("express");
const { register, login } = require("../controllers/auth-controller");
const {
  validatorWithZod,
  registerSchema,
  loginSchema,
} = require("../middlewares/validator");

const router = express.Router();

// Register Route
router.post("/register", validatorWithZod(registerSchema), register);

// Login Route
router.post("/login", validatorWithZod(loginSchema), login);

// Store Route
router.post("current-user");
router.post("current-admin");

module.exports = router;
