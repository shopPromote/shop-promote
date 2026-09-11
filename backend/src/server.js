import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import auth from "./routes/auth.js";
import shops from "./routes/shops.js";
import influencers from "./routes/influencers.js";
import bookings from "./routes/bookings.js";
import reviews from "./routes/reviews.js";

const app = express();

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim())
  : [];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header
      // such as health checks or server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
  })
);

app.use(express.json({ limit: "2mb" }));

app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "ShopPromote API",
  });
});

app.use("/api/auth", auth);
app.use("/api/shops", shops);
app.use("/api/influencers", influencers);
app.use("/api/bookings", bookings);
app.use("/api/reviews", reviews);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`ShopPromote API running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });