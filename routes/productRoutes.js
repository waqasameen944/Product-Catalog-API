import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategory,
  getProductByPagination,
  getProductBySearch,
  updateProduct,
} from "../controllers/productController.js";

import { errorValidation } from "../middleware/errorValidation.js";
import {
  productValidator,
  productIdValidator,
} from "../validators/prodcutValidator.js";

//router object
const router = express.Router();

//routes

// GET /products?page=1&limit=10
router.get("/pagination", getProductByPagination);

// GET /products?search=phone
router.get("/search", getProductBySearch);

// GET /products?category=electronics
router.get("/category", getProductByCategory);

// GET /products
router.get("/getallproducts", getAllProducts);

// POST /products
router.post("/product", productValidator, errorValidation, createProduct);

// PUT /products/:id
router.put(
  "/:id",
  productIdValidator,
  productValidator,
  errorValidation,
  updateProduct
);

// DELETE /products/:id
router.delete("/:id", productIdValidator, errorValidation, deleteProduct);

export default router;
