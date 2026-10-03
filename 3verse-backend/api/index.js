import app from "../src/app.js";
import connectDB from "../src/config/db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection failed:", err);
    return res
      .status(500)
      .json({ success: false, message: "Database connection failed" });
  }
  return app(req, res);
}
