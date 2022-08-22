const { Schema, model } = require('mongoose');
const Joi = require("joi");
const groupCash = ["UAN", "USD", "EUR", "GBP", "JPY", "CHF", "CNY", "AED", "AFN", "ALL", "AOA", "ARS", "AUD", "AZN", "BDT", "BGN", "BHD", "BIF", "BND", "BOB", "BRL", "BWP",];

const addCard = Joi.object({
  bank: Joi.string().default(''),
  type: Joi.string().default(''),
  paymentSystemType: Joi.string().default(''),
  number: Joi.string().required(),
  expireDate: Joi.string().required(),
  amount: Joi.number().default(0),
  ccy: Joi.string().default("UAN"),
  cardHolder: Joi.string().default(''),
  cvv: Joi.number().required()
});
const editAmountOnCard = Joi({
    amount: Joi.number().default(0),
  ccy: Joi.string().default("UAN"),
})
const schemas = {
  addCard,
  editAmountOnCard
}

const cardSchema = Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  bank: String, default: '',
  type: String, default: '',
  paymentSystemType: String, default: '',
  number: String, required: [true, 'Card number is required'],
  expireDate: String, required: [true, 'Expire Date is required'],
  amount: Number, default: 0,
  ccy: String, default: "UAN", enum: groupCash,
  cardHolder: String, default: '',
  cvv: Number, required: [true, 'CVV is required'],
}, { versionKey: false, timestamps: true });

const Card = model('card', cardSchema);
module.exports = {
  Card,
  schemas
};

