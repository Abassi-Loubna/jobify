import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import gigRouter from "./routes/gig.js";
import reviewRouter from "./routes/review.js";
import errorMiddleware from "./middleware/errorHandler.js";
import adminRouter from "./routes/admin.js";

dotenv.config();
const app = express();

// --- 1. تحديث قائمة الروابط المسموحة ---
const allowedOrigins = [
  "https://jobify-beta-eight.vercel.app",
  "https://jobify-beta-two.vercel.app",
  "https://admin-jobify.vercel.app", 
  "http://localhost:5173",
  "http://localhost:5174"
];

// --- 2. إعدادات CORS المحسنة ---
app.use(cors({
  origin: (origin, callback) => {
    // السماح بالطلبات بدون Origin (مثل تطبيقات الموبايل أو Postman) أو الروابط المحددة
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("🚫 CORS Blocked for origin:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "Cookie"]
}));

// حل مشكلة طلبات الـ OPTIONS (Preflight) يدوياً لضمان استقرار Render
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`📩 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => res.send("🚀 Server is running!"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL || process.env.MONGO_URL;

mongoose.connect(DB_URL as string)
  .then(() => {
    console.log("✅ Database Connected Successfully");
    app.listen(PORT, () => console.log(`🔥 Server is running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ Database Connection Error:", err);
  });