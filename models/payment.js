const mongoose = require("mongoose");
const Joi = require("joi");

// Payment Schema with Mongoose Validation
const paymentSchema = mongoose.Schema(
  {
  orderId: {
    type:String,
    required:true,
  },
  paymentId:{
    type:String,
  },
  signature:{
    type:String,
  },
  amount:{
    type:Number,
    require:true
  },
  currency:{
    type:String,
    require:true,
  },
  status:{
    type:String,
    default:"pending",
  },
}, {timestamps:true}
);



// Joi validation schema
const validatePayment = (payment) => {
  const schema = Joi.object({
    order: Joi.string().required(),  // ObjectId as string
    amount: Joi.number().min(0).required(),
    method: Joi.string().required(),
    status: Joi.string().required(),
    transactionID: Joi.string().required(),
    products: Joi.array().items(Joi.string().required()).required(),  // Array of ObjectIds as strings
  });

  return schema.validate(payment);
};

// Export both the model and validation function
module.exports = {
  paymentModel:mongoose.model("payment", paymentSchema),
  validatePayment,
};
