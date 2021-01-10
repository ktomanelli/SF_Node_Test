const mongoose = require('mongoose');

const { Schema } = mongoose;

const CreditorSchema = new Schema({
  creditorName: String,
  firstName: String,
  lastName: String,
  minPaymentPercentage: Number,
  balance: Number,
});

const Creditor = mongoose.model('creditor', CreditorSchema);

module.exports = Creditor;
