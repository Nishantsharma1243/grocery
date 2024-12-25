const mongoose = require("mongoose");
const Joi = require("joi");

// Admin Schema with Mongoose Validation
const adminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email address.']
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 255
        },
        role: {
            type: String,
            enum: ['admin', 'superadmin'],  // Define acceptable roles
            default: 'admin',
            required: true
        }
    },
    { timestamps: true }  // Ensure timestamps
);



// Joi validation schema
const validateAdmin = (admin) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required(),
        role: Joi.string().valid('admin', 'superadmin').required()
    });

    return schema.validate(admin);
};

// Export both the model and validation function
module.exports = {
    adminModel:mongoose.model("admin",adminSchema),
    validateAdmin
};
