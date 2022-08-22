const mongoose = require('mongoose');
const Joi = require("joi");
const { array } = require('joi');
const Schema = mongoose.Schema;
const model = mongoose.model;
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const groupCash=["UAN", "USD", "EUR", "GBP", "JPY", "CHF","CNY","AED","AFN","ALL","AOA","ARS","AUD","AZN","BDT","BGN","BHD","BIF","BND","BOB", "BRL", "BWP",]

const registerUser= Joi.object({
    name:Joi.string().required(),
    email: Joi.string().required().pattern(emailRegexp),
    password: Joi.string().min(6).required(),
    cash: Joi.array().default([]),
    token: Joi.string().default('')
});
const loginUser= Joi.object({
    email: Joi.string().required().pattern(emailRegexp),
    password: Joi.string().min(6).required()
});
const verifyEmailSchema= Joi.object({
    email: Joi.string().required().pattern(emailRegexp)
});
const editAmountCash = Joi({
  amount: Joi.number().default(0),
  ccy: Joi.string().default("UAN"),
});
const schemas = {
  registerUser,
  loginUser,
  verifyEmailSchema,
  editAmountCash
}


const userSchema = Schema({
  name: { type: String, require: [true, "Name is required"] },
  email: { type: String, require: [true, "Email is required"], uniqu: true, match: emailRegexp },
  password: { type: String, required: [true, 'Password is required'], minlength: 6 },
  token: { type: String, default: '' },
  verify: { type: Boolean, default: false },
  verificationToken: { type: String, required: [true, "Verify token is required"] },
  cash: [
    { amount: Number, default: 0 },
    { ccy: String, default:"UAN", enum: groupCash }
  ]
  
}, { versionKey: false, timestamps: true });


const User = model('user', userSchema);

module.exports={
    User, 
    schemas
};


