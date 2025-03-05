const prisma = require("../configs/prismaClient");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

// Verify Token Middleware
exports.authCheck = async (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(createError(401, "Authorization missing"));
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err.message);
        return next(createError(403, "Invalid or expired token"));
      }

      // If role is missing, fetch from DB
      if (!decoded.role) {
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: { role: true },
        });

        if (!user) {
          return next(createError(401, "User not found"));
        }

        decoded.role = user.role;
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
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
