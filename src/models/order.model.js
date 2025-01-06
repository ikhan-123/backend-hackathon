import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        orderDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "shipped"],
            default: "pending",
        }
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);