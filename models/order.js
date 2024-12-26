const mongoose = require("mongoose");
const Joi = require("joi");

// Order Schema with Mongoose Validation
const orderSchema = mongoose.Schema(
    {
        orderId:{
            type:String,
            required:true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",  // Should reference "Product" instead of "User"
                required: true
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            min: 0
        },
        address: {
            type: String,
            minlength: 10,
            maxlength: 255
        },
        status: {
            type: String,
            enum: ['pending','processing', 'shipped', 'delivered', 'cancelled'],  // Only allow these values
            default: 'pending',
            required: true
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "payment",
            required: true
        },
        delivery: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "delivery"
        }
    },
    { timestamps: true }  // Ensure timestamps
);



// Joi validation schema
const validateOrder = (order) => {
    const schema = Joi.object({
        user: Joi.string().required(),  // ObjectId as string
        products: Joi.array().items(Joi.string().required()).required(),  // Array of ObjectIds as strings
        totalPrice: Joi.number().min(0).required(),
        address: Joi.string().min(10).max(255).required(),
        status: Joi.string().valid('pending', 'shipped','processing', 'delivered', 'cancelled').required(),
        payment: Joi.string().required(),  // ObjectId as string
        delivery: Joi.string().optional()  // Optional ObjectId as string
    });

    return schema.validate(order);
};

// Export both the model and validation function
module.exports = {
    orderModel:mongoose.model("order", orderSchema),
    validateOrder,
};
