import express from "express";
import {
  signup,
  login,
  getUser,
  syncPartial,
  syncUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/getUser", getUser);
router.post("/syncPartial", syncPartial);
router.post("/syncUser", syncUser);

export default router;
