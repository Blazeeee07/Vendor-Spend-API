const express = require("express");
const {
  getVendorSpendReport,
  createPurchaseOrder,
  createInvoice
} = require("../controllers/reportController");

const router = express.Router();

router.get("/vendor-spend", getVendorSpendReport);
router.post("/purchase-orders", createPurchaseOrder);
router.post("/invoices", createInvoice);

module.exports = router;
