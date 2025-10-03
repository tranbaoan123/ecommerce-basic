import express from "express";
import {
  isAuthenticated,
  isAuthorizedRole,
} from "../middleware/auth.middleware.js";
import {
  canReview,
  createProduct,
  createProductReview,
  deleteProduct,
  deleteProductImage,
  deleteProductReview,
  getAllProducts,
  getAllProductsAdmin,
  getProductById,
  getProductReviews,
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
router.get("/products/reviews", [isAuthenticated], getProductReviews);
router.delete(
  "/products/reviews",
  [isAuthenticated, isAuthorizedRole("admin")],
  deleteProductReview
);
router.get("/products/reviews/can-review", [isAuthenticated], canReview);
export default router;
