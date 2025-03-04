const prisma = require("../configs/prismaClient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("../utils/createError");

// Register
module.exports.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword,
      phone,
      address,
      street,
      zipCode,
      role,
    } = req.body;

    // Validate confirmPassword
    if (password !== confirmPassword) {
      return next(createError(400, "Passwords do not match"));
    }

    // Check if email exists
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return next(createError(400, "Email already exists"));
    }

    // Check if userName exists
    const existingUserName = await prisma.user.findUnique({
      where: { userName },
    });
    if (existingUserName) {
      return next(createError(400, "Username already exists"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 : salt

    // Create new user
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword,
        phone,
        address,
        street,
        zipCode,
        role,
      },
    });

    res.status(201).json({ message: "Register success" });
  } catch (error) {
    next(error);
  }
};

// Login
// Login
module.exports.login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    // Find user by email or username
    const findUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { userName: identifier }],
      },
    });

    // Check identifier in database
    if (!findUser) {
      return next(createError(401, "Invalid user or password credentials"));
    }

    // Disabled user
    if (!findUser.enabled) {
      return res
        .status(400)
        .json({ message: "Account can not access, Please contact Admin" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return next(createError(400, "Email or password is incorrect"));
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: findUser.id, role: findUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: findUser.id,
        userName: findUser.userName,
        email: findUser.email,
        role: findUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
