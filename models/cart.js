const mongoose = require("mongoose");
const Joi = require("joi");
const { ObjectId } = mongoose.Schema.Types;

// Cart Schema with Mongoose Validation
const cartSchema = mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "user",
            required: true
        },
        products: [
            {
                type: ObjectId,
                ref: "product",
                required: true
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { timestamps: true }  // Ensure timestamps
);



// Joi validation schema
const validateCart = (cart) => {
    const schema = Joi.object({
        user: Joi.string().required(),  // ObjectId as string
        products: Joi.array().items(Joi.string().required()).required(),  // Array of ObjectIds as strings
        totalPrice: Joi.number().min(0).required()
    });

    return schema.validate(cart);
};

// Export both the model and validation function
module.exports = {
    cartModel:mongoose.model("cart",cartSchema),
    validateCart
};
