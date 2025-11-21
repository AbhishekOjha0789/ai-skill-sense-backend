import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

app.listen(process.env.PORT || 4000, () =>
  console.log("Server running")
);
app.get("/", (req, res) => {
  res.send("Server Running");
});

// Check MongoDB status
app.get("/test-db", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ status: "ok", mongo: "connected" });
  } catch (e) {
    res.json({ status: "error", mongo: e.message });
  }
});
