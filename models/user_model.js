const mongoose = require("mongoose");
const Joi = require("joi");

// Address Schema
const AddressSchema = mongoose.Schema({
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    zip: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 10
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
});

// User Schema with Mongoose Validation
const userSchema = mongoose.Schema(
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
            minlength: 6,
            maxlength: 255
        },
        phone: {
            type: Number,
            match:/^[0-9]{10}$/,
        },
        addresses: {
            type: [AddressSchema],
        }
    }, 
    { timestamps: true }  // Ensure timestamps
);




// Joi validation schema
const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        addresses: Joi.array().items(
            Joi.object({
                state: Joi.string().min(2).max(50).required(),
                zip: Joi.number().min(10000).max(999999).required(),
                city: Joi.string().min(2).max(50).required(),
                address: Joi.string().min(5).max(100).required(),
            })
        )
    });

    return schema.validate(user);
};

// Export both the model and validation function
module.exports = {
    userModel:mongoose.model('user',userSchema),
    validateUser
};

