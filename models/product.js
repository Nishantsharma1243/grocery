const mongoose = require("mongoose");
const Joi = require("joi");

// Product Schema with Mongoose
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        stock: {
            type: Number,
            default: true
        },
        description: {
            type: String,
        },
        image: {
            type: Buffer,
        }
    },
    { timestamps: true }  // Ensure timestamps
);



// Joi validation schema
const validateProduct = (product) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().min(3).max(50).required(),
        stock: Joi.number().default(true),
        description: Joi.string().max(1000).optional(),
        image: Joi.string().optional()  // Validate that it's a valid URL
    });

    return schema.validate(product);
};

// Export both the model and validation function
module.exports = {
    productModel:mongoose.model("product", productSchema),
    validateProduct
};
