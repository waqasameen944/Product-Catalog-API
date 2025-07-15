import { body, param } from "express-validator";

export const productValidator = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("category").notEmpty().withMessage("Product category is required"),
  body("price").notEmpty().withMessage("Product price is required"),
  body("currency").notEmpty().withMessage("Product currency is required"),
  body("inStock").notEmpty().withMessage("Product inStock is required"),
  body("rating").notEmpty().withMessage("Product rating is required"),
];

export const productIdValidator = [
  param("id").isMongoId().withMessage("Invalid product id"),
];
