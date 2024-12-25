const mongoose = require("mongoose");
const Joi = require("joi");

// Delivery Schema with Mongoose Validation
const deliverySchema = mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order",
            required: true
        },
        deliveryBoy: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered', 'cancelled'],  // Only allow specific status values
            default: 'pending',
            required: true
        },
        trackingURL: {
            type: String,
            required: true
        },
        estimatedDeliveryTime: {
            type: Number,
            min: 0,  // Estimated time should be a non-negative number
            required: true
        }
    },
    { timestamps: true }  // Ensure timestamps
);



// Joi validation schema
const validateDelivery = (delivery) => {
    const schema = Joi.object({
        order: Joi.string().required(),  // ObjectId as string
        deliveryBoy: Joi.string().min(3).max(50).required(),
        status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled').required(),
        trackingURL: Joi.string().uri().required(),  // Validate that it's a valid URL
        estimatedDeliveryTime: Joi.number().min(0).required()  // Non-negative number
    });

    return schema.validate(delivery);
};

// Export both the model and validation function
module.exports = {
  deliveryModel:mongoose.model("delivery", deliverySchema),
    validateDelivery
};
