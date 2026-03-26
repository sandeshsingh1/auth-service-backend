import express from "express";
import { signup, login, refresh, logoutAll } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
const router = express.Router();

// auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout-all", protect, logoutAll);// protected routes
router.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});
router.get("/admin", protect, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Admin only" });
});

export default router;