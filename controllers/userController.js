import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { uid, password } = req.body;

    const exists = await User.findOne({ uid });
    if (exists) return res.json({ success: false, msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.create({ uid, password: hash });

    res.json({ success: true, msg: "Signup successful" });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { uid, password } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.json({ success: false, msg: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.json({ success: false, msg: "Wrong password" });

    res.json({ success: true, user });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { uid, password } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.json({ success: false, msg: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.json({ success: false, msg: "Wrong password" });

    res.json({ success: true, user });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
};

export const syncPartial = async (req, res) => {
  try {
    const { uid, password, tables } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.json({ success: false, msg: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.json({ success: false, msg: "Wrong password" });

    for (const key in tables) {
      user[key] = tables[key];
    }

    await user.save();

    res.json({ success: true });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
};

export const syncUser = async (req, res) => {
  try {
    const { uid, password, data } = req.body;

    const user = await User.findOne({ uid });
    if (!user) return res.json({ success: false, msg: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.json({ success: false, msg: "Wrong password" });

    Object.assign(user, data);

    await user.save();

    res.json({ success: true });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
};
