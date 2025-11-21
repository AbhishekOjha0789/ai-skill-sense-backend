import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  const { uid, password } = req.body;

  if (!uid || !password)
    return res.json({ success: false, message: "Missing fields" });

  let user = await User.findOne({ uid });

  if (!user)
    return res.json({ success: false, message: "User not found" });

  if (user.password !== password)
    return res.json({ success: false, message: "Wrong password" });

  res.json({ success: true, user });
});

// FULL SYNC
router.post("/syncUser", async (req, res) => {
  const data = req.body;
  const { uid } = data;

  let user = await User.findOneAndUpdate(
    { uid },
    { $set: data },
    { new: true, upsert: true }
  );

  res.json({ success: true, message: "User synced successfully", user });
});

// ---- PARTIAL SYNC ROUTE ----
router.post("/syncPartial", async (req, res) => {
    try {
        const { uid, data } = req.body;

        if (!uid || !data) {
            return res.status(400).json({ message: "Missing uid or data" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { uid },
            { $set: data },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET USER (Query-based)
router.get("/getUser", async (req, res) => {
  try {
    const { uid, password } = req.query;

    if (!uid || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing uid or password"
      });
    }

    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(403).json({
        success: false,
        message: "Wrong password"
      });
    }

    return res.json({
      success: true,
      user
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
