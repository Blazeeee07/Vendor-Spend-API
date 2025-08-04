const express = require("express");
const {
  getVendorSpendReport,
  createPurchaseOrder,
  createInvoice
} = require("../controllers/reportController");

const limiter = require("../utils/rateLimiter")



const router = express.Router();

router.get("/vendor-spend",limiter, getVendorSpendReport);
router.post("/purchase-orders",limiter, createPurchaseOrder);
router.post("/invoices", limiter ,createInvoice);

module.exports = router;
