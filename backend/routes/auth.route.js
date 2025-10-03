import express from "express";
import {
  register,
  login,
  logout,
  getUserProfile,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getUserDetails,
  uploadAvatar,
  updateUser,
  deleteUser,
} from "../controllers/auth.controller.js";
import {
  isAuthenticated,
  isAuthorizedRole,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", [isAuthenticated], getUserProfile);
router.put("/password/update", [isAuthenticated], updateUserPassword);
router.put("/profile/update", [isAuthenticated], updateUserProfile);
router.put("/avatar-upload", [isAuthenticated], uploadAvatar);
router.get(
  "/admin/users",
  [isAuthenticated, isAuthorizedRole("admin")],
  getAllUsers
);
router.get(
  "/admin/users/:id",
  [isAuthenticated, isAuthorizedRole("admin")],
  getUserDetails
);
router.put(
  "/admin/users/:id",
  [isAuthenticated, isAuthorizedRole("admin")],
  updateUser
);
router.delete(
  "/admin/users/:id",
  [isAuthenticated, isAuthorizedRole("admin")],
  deleteUser
);

export default router;
