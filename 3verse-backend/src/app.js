import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";

import rateLimit from "express-rate-limit";
import hpp from "hpp";
import compression from "compression";

const app = express();

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];

// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS: Origin not allowed"));
//       }
//     },
//     credentials: true,
//   }),
// );
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Security Middlewares
app.use(limiter);
app.use(hpp());
app.use(compression());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/portfolio", portfolioRoutes);

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Telvida Backend API 🚀",
  });
});

// Global Error Handler (Always Last)
app.use(errorHandler);

export default app;
