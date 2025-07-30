const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema({
  vendor: String,
  amount: Number,
  date: Date,
});

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
