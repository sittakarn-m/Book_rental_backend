const prisma = require("../configs/prismaClient");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

// Verify Token Middleware

exports.authCheck = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw createError(401, "Authorization missing");
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw createError(401, "Authorization missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("❌ AuthCheck Error:", error); // Add logging
    res.status(401).json({ message: error.message });
  }
};


exports.adminCheck = (req, res, next) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      return next(createError(401, "Unauthorized access"));
    }
    console.log(req.user);

    // Check if the user has an ADMIN role
    if (req.user.role !== "ADMIN") {
      return next(createError(403, "Access Denied: Admins only"));
    }

    next();
  } catch (error) {
    next(error);
  }
};
