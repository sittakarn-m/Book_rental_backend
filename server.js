require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const notFound = require("./middlewares/notFound");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const authRoute = require("./routes/auth-route");
const categoryRoute = require("./routes/category-route");
const bookRoute = require("./routes/book-route");
const userRoute = require("./routes/user-route");
const adminRoute = require("./routes/admin-route");
const orderRoute = require("./routes/order-router");
const prisma = require("./configs/prismaClient");
const multer = require("multer");
const { authCheck } = require("./middlewares/auth-middleware");
const mockUser = require("./middlewares/mockUser");

const app = express();
app.use(mockUser);

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

//// Routing ////

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/category", categoryRoute);
app.use("/book", bookRoute);
app.use("/order", orderRoute);

//////////////////////////////////////////

// not found
app.use(notFound);

// error Middleware
app.use(errorMiddleware);

// start Port
const port = process.env.PORT || 8899;
app.listen(port, () => console.log(`Server is running on port ${port} `));
