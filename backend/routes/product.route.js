import express from "express";
import {
  isAuthenticated,
  isAuthorizedRole,
} from "../middleware/auth.middleware.js";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getAllProductsAdmin,
  getProductById,
  updateProduct,
  uploadProductImages,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post(
  "/admin/products",
  [isAuthenticated, isAuthorizedRole("admin")],
  createProduct
);
router.put(
  "/admin/products/:id/upload-images",
  [isAuthenticated, isAuthorizedRole("admin")],
  uploadProductImages
);
router.delete(
  "/admin/products/:id/delete-image",
  [isAuthenticated, isAuthorizedRole("admin")],
  deleteProductImage
);
router.get(
  "/admin/products",
  [isAuthenticated, isAuthorizedRole("admin")],
  getAllProductsAdmin
);
router.put(
  "/admin/products/:id",
  [isAuthenticated, isAuthorizedRole("admin")],
  updateProduct
);
router.delete(
  "/admin/products/:id",
  [isAuthenticated, isAuthorizedRole("admin")],
  deleteProduct
);
router.put("/products/review", [isAuthenticated], createProductReview);
router.get("/products/reviews", [isAuthenticated], getProductById);
export default router;
