import express from "express";
import {
  allOrders,
  createNewOrder,
  deleteOrder,
  getOrderDetails,
  getSales,
  myOrders,
  updateOrder,
} from "../controllers/order.controller.js";
import {
  isAuthenticated,
  isAuthorizedRole,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/orders/new", [isAuthenticated], createNewOrder);
router.get("/orders/:id", [isAuthenticated], getOrderDetails);
router.get("/me/orders", [isAuthenticated], myOrders);
router.get(
  "/admin/orders",
  [isAuthenticated, isAuthorizedRole("admin")],
  allOrders
);
router.get(
  "/admin/get-sales",
  [isAuthenticated, isAuthorizedRole("admin")],
  getSales
);
router.put(
  "/admin/orders/:id",
  [isAuthenticated, isAuthorizedRole("admin")],
  updateOrder
);
router.delete(
  "/admin/orders/:id",
  [isAuthenticated, isAuthorizedRole("admin")],
  deleteOrder
);

export default router;
