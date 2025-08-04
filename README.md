# Vendor Spend Reporting API

This is a simple Node.js + Express.js + MongoDB API that tracks vendor-wise purchase orders and invoices, and generates a consolidated vendor spend report.

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose ODM)

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Vendor-Spend-API.git
   cd vendor-report-api

2. **Install Dependencies**
   ```bash
   npm install
3. **Create a .env file**
   `
   touch .env

**ADD THE FOLLOWING**:
MONGO_URI=<your_mongodb_connection_string>
PORT=5000

4. **Run the server**
   
   npm start

## 📮 API Endpoints

### ✅ GET `/api/reports/vendor-spend`

API to fetch spend analysis from MongoDB collections.

#### Success response:

[
    {
        "vendor": "Vendor A",
        "totalPOAmount": 10000,
        "totalInvoicePaid": 6000
    }
]

### ✅ POST `/api/reports/purchase-orders`

Create a new purchase order.

#### 🔸 Request Payload:

{
  "vendor": "Vendor A",
  "amount": 5000
}


#### Success response:

{
    "message": "Purchase order created",
    "data": {
        "vendor": "Vendor A",
        "amount": 5000,
        "date": "2025-07-30T18:53:26.329Z",
        "_id": "688a6a263e57b325ef947259",
        "__v": 0
    }
}


### ✅ POST `/api/reports/invoices`

Create a new invoice.

#### 🔸 Request Payload:


{
  "vendor": "Vendor A",
  "amountPaid": 3000
}


#### Success response:

{
    "message": "Invoice created",
    "data": {
        "vendor": "Vendor A",
        "amountPaid": 3000,
        "paidDate": "2025-07-30T18:55:21.893Z",
        "_id": "688a6a993e57b325ef94725b",
        "__v": 0
    }
}




