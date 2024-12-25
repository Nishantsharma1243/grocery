
const mongoose = require('mongoose');
const Joi = require('joi');

// Notification Schema with Mongoose Validation
const notificationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',  // Reference to the User model
      required: true
    },
    message: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }  // Ensure timestamps
);


// Joi validation schema
const validateNotification = (notification) => {
  const schema = Joi.object({
    user: Joi.string().required(),  // ObjectId as string
    message: Joi.string().min(5).max(255).required(),
    read: Joi.boolean().optional()  // Optional, defaults to false
  });

  return schema.validate(notification);
};

// Export both the model and validation function
module.exports = {
  notificationModel:mongoose.model('notification', notificationSchema),
  validateNotification
};

