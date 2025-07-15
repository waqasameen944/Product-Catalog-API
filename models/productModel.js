import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import dotenv from "dotenv";
dotenv.config();

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
  },
  description: {
    type: String,
  },
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);

export default Product;
