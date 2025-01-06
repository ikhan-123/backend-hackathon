import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String, // URL to the image
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order"
            }
        ]
    },
    { timestamps: true }
);

productSchema.plugin(mongooseAggregatePaginate);
export const Product = mongoose.model("Product", productSchema);