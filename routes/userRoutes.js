import express from "express";
import User from "../models/User.js";

const router = express.Router();

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

export default router;
