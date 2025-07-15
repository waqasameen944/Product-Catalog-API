import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// GET /products?page=1&limit=10
export const getProductByPagination = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const result = await Product.paginate({}.options);
    if (!result) return next(new ErrorHandler("Products not found", 404));

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

// GET /products?search=phone
export const getProductBySearch = async (req, res, next) => {
  try {
    const searchQuery = req.query.search;

    const products = await Product.find({
      name: { $regex: searchQuery, $options: "i" },
    });
    if (!products) return next(new ErrorHandler("Products not found", 404));

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};

// GET /products?category=electronics
export const getProductByCategory = async (req, res, next) => {
  try {
    const category = req.query.category;

    const products = await Product.find({
      category: { $regex: category, $options: "i" },
    });

    if (products.length === 0)
      return next(new ErrorHandler("No Category Found", 404));
    if (!products) return next(new ErrorHandler("Category not found", 404));

    res.status(200).json({
      success: true,
      count: products.length,
      message: "Category fetched successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};

// GET /products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) return next(new ErrorHandler("Products not found", 404));

    res.status(200).json({
      count: products.length,
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};

// POST /products
export const createProduct = async (req, res, next) => {
  try {
    const { name, category, price, currency, inStock, rating } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      currency,
      inStock,
      rating,
    });

    await product.save();

    res.status(201).json({
      suceess: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, category, price, currency, inStock, rating } = req.body;

    const product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    //update fields if available
    if (name !== undefined) product.name = name;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = price;
    if (currency !== undefined) product.currency = currency;
    if (inStock !== undefined) product.inStock = inStock;
    if (rating !== undefined) product.rating = rating;

    await product.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
