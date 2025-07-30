const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  vendor: String,
  amountPaid: Number,
  paidDate: Date,
});

module.exports = mongoose.model("Invoice", invoiceSchema);
