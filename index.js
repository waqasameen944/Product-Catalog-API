import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import dbConnect from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";

//rest object
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

//db
dbConnect();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/product", productRoutes);

//error
app.use(errorMiddleware);

//sever
app.listen(PORT, console.log(`server running on port ${PORT}`));
