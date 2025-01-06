import dotenv from "dotenv";
import express from "express";
import connectDb from "./db/index.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config({
    path: ".env"
});

const app = express();

app.use(express.json());
app.use('/auth', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

connectDb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.log("MONGO DB connection failed !!!", error);
    });