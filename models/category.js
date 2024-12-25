const mongoose = require("mongoose");
const Joi = require("joi");

// Category Schema with Mongoose Validation
const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            unique:true,
        }
    },
    { timestamps: true }  // Ensure timestamps
);



// Joi validation schema
const validateCategory = (category) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });

    return schema.validate(category);
};

// Export both the model and validation function
module.exports = {
    categoryModel:mongoose.model("category", categorySchema),
    validateCategory
};
