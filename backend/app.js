import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middleware/errors.js";

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught expection");
  process.exit(1);
});

dotenv.config();

// Connecting to database
connectDatabase();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Import all routes
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import orderRoutes from "./routes/order.route.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);

// Using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
