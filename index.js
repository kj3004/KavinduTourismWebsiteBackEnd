import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/booking.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Corrected CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  credentials: true, // Allow cookies and credentials
};

// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connected");
  } catch (error) {
    console.log("MongoDB database connection failed");
  }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Apply corrected CORS configuration
app.use(cookieParser());
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

// Server setup
app.listen(port, () => {
  connect();
  console.log("Server listening on port", port);
});
