import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandlin.middleware";
import authRoutes from "./routes/auth/auth.routes";
import adminProducts from "./routes/admin/product.routes";
import shopProductRoutes from "./routes/shop/products.routes";
import cookieParse from "cookie-parser";
import OauthRoutes from "./routes/oauth/google.routes";
import cartRoutes from "./routes/cart/Cart.Routes";
import addressRoutes from "./routes/shop/address.routes";
import orderRouter from "./routes/shop/order.routes";
import AdminOrderRouter from "./routes/admin/order.routes";
import productSearchRoutes from "./routes/shop/search.routes";
import productReview from "./routes/shop/review.route";
import AdminFeatureRoute from "./routes/admin/feature.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParse());
// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin/product", adminProducts);
app.use("/api/admin/order", AdminOrderRouter);
app.use("/api/admin/feature", AdminFeatureRoute);

app.use("/api", OauthRoutes);

app.use("/api/shop/product", shopProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/shop/address", addressRoutes);
app.use("/api/shop/order", orderRouter);
app.use("/api/product/search", productSearchRoutes);
app.use("/api/product/review", productReview);

mongoose
  .connect(
    "mongodb+srv://mdrmoney34:mdrmoney34@cluster0.klkq8ku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connectred"))
  .catch((e) => console.log("Datasebase not connected", e));

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});
