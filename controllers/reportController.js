const PurchaseOrder = require("../models/PurchaseOrder");
const Invoice = require("../models/Invoice");

const getVendorSpendReport = async (req, res) => {
  try {
    const poAgg = await PurchaseOrder.aggregate([
      { $group: { _id: "$vendor", totalPOAmount: { $sum: "$amount" } } }
    ]);

    const invoiceAgg = await Invoice.aggregate([
      { $group: { _id: "$vendor", totalInvoicePaid: { $sum: "$amountPaid" } } }
    ]);

    const resultMap = new Map();

    poAgg.forEach(po => {
      resultMap.set(po._id, { vendor: po._id, totalPOAmount: po.totalPOAmount, totalInvoicePaid: 0 });
    });

    invoiceAgg.forEach(inv => {
      if (resultMap.has(inv._id)) {
        resultMap.get(inv._id).totalInvoicePaid = inv.totalInvoicePaid;
      } else {
        resultMap.set(inv._id, { vendor: inv._id, totalPOAmount: 0, totalInvoicePaid: inv.totalInvoicePaid });
      }
    });

    res.json(Array.from(resultMap.values()));
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createPurchaseOrder = async (req, res) => {
  const { vendor, amount, date } = req.body;
  if (!vendor || !amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid purchase order input" });
  }

  try {
    const po = new PurchaseOrder({ vendor, amount, date: date || new Date() });
    await po.save();
    res.status(201).json({ message: "Purchase order created", data: po });
  } catch (error) {
    res.status(500).json({ error: "Failed to create purchase order" });
  }
};

const createInvoice = async (req, res) => {
  const { vendor, amountPaid, paidDate } = req.body;
  if (!vendor || !amountPaid || amountPaid <= 0) {
    return res.status(400).json({ error: "Invalid invoice input" });
  }

  try {
    const invoice = new Invoice({ vendor, amountPaid, paidDate: paidDate || new Date() });
    await invoice.save();
    res.status(201).json({ message: "Invoice created", data: invoice });
  } catch (error) {
    res.status(500).json({ error: "Failed to create invoice" });
  }
};

module.exports = {
  getVendorSpendReport,
  createPurchaseOrder,
  createInvoice
};
