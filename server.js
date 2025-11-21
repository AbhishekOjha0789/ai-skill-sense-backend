import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => res.send("Backend is Running"));

app.use("/", userRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running...")
);
