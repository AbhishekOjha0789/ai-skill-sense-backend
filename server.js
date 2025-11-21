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

port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log("Server running on port", port)
);
