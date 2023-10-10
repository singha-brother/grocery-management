const sqlite3 = require('sqlite3').verbose()

const createCategoryTable = `CREATE TABLE IF NOT EXISTS "categories" (
  "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name"	TEXT NOT NULL,
  "is_active"	BOOLEAN,
  "created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
  UNIQUE("name", "is_active")
);`

const createProductTable = `CREATE TABLE IF NOT EXISTS "products" (
  "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "description"	TEXT,
  "name"	TEXT NOT NULL,
  "unit"	TEXT,
  "sale_price"	INTEGER,
  "buy_price"	INTEGER,
  "category_id"	INTEGER,
  "created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
  FOREIGN KEY("category_id") REFERENCES "categories"("id"),
  UNIQUE("name", "sale_price", "buy_price", "unit", "category_id")
);`

const createStockTable = `CREATE TABLE IF NOT EXISTS "stocks" (
  "id"    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "in_stock" NUMERIC DEFAULT 0 NOT NULL,
  "sold" NUMERIC DEFAULT 0 NOT NULL,
  "loss" NUMERIC DEFAULT 0 NOT NULL,
  "product_id" INTEGER,
  "created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
  FOREIGN KEY("product_id") REFERENCES "products"("id")
)`

const createSupplierTable = `CREATE TABLE IF NOT EXISTS "suppliers" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "company_name" TEXT DEFAULT '',
  "phone_number" TEXT DEFAULT '',
  "created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
  UNIQUE("name", "company_name", "phone_number")
)`

const createPurchaseTable = `CREATE TABLE IF NOT EXISTS "purchases" (
"id"	INTEGER NOT NULL UNIQUE,
"total"	INTEGER NOT NULL,
"total_paid"	INTEGER NOT NULL,
"supplier_id"	INTEGER,
"transaction_id"	INTEGER,
"created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
FOREIGN KEY("transaction_id") REFERENCES "transactions"("id"),
FOREIGN KEY("supplier_id") REFERENCES "suppliers"("id"),
PRIMARY KEY("id" AUTOINCREMENT)
);`

const createTransactionTable = `CREATE TABLE IF NOT EXISTS "transactions" (
"id"	INTEGER NOT NULL UNIQUE,
"type"	TEXT,
"amount"	INTEGER NOT NULL,
"created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
PRIMARY KEY("id" AUTOINCREMENT)
);`

const createPurchaselineTable = `CREATE TABLE IF NOT EXISTS "purchaselines" (
	"id"	INTEGER NOT NULL UNIQUE,
	"product_id"	INTEGER,
	"purchase_id"	INTEGER,
	"quantity"	INTEGER,
	"buy_price"	INTEGER,
  "created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("product_id") REFERENCES "products"("id"),
	FOREIGN KEY("purchase_id") REFERENCES "purchases"("id")
);`

const createCustomerTable = `CREATE TABLE IF NOT EXISTS "customers" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone_number" TEXT DEFAULT '',
    "created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
)`

const createOrderlineTable = `CREATE TABLE IF NOT EXISTS "orderlines" (
	"id"	INTEGER NOT NULL UNIQUE,
	"product_id"	INTEGER,
	"order_id"	INTEGER,
	"quantity"	INTEGER,
	"sale_price"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("product_id") REFERENCES "products"("id"),
	FOREIGN KEY("order_id") REFERENCES "orders"("id")
);`

const createOrderTable = `CREATE TABLE IF NOT EXISTS "orders" (
	"id"	INTEGER NOT NULL UNIQUE,
	"total"	INTEGER NOT NULL,
	"total_paid"	INTEGER NOT NULL,
	"customer_id"	INTEGER,
	"transation_id"	INTEGER,
	FOREIGN KEY("transation_id") REFERENCES "transactions"("id"),
	FOREIGN KEY("customer_id") REFERENCES "customers"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);`

const addDefaultCustomer = `INSERT INTO customers (name) VALUES ('Walk-in')`
const addDefaultSupplier = `INSERT INTO suppliers (name) VALUES ('Walk-in')`

const db = new sqlite3.Database('./data.db', (err) => {
  if (err) {
    console.log(err.message)
    return
  }
  console.log('Connected to SQLite Database')

  db.run(createCategoryTable)
  db.run(createProductTable)
  db.run(createStockTable)
  db.run(createSupplierTable, (err) => {
    if (err) return
    db.get('SELECT * FROM suppliers WHERE id = 1', (err, row) => {
      if (row) return
      db.run(addDefaultSupplier)
    })
  })
  db.run(createPurchaseTable)
  db.run(createTransactionTable)
  db.run(createPurchaselineTable)
  db.run(createCustomerTable, (err) => {
    if (err) return
    db.get('SELECT * FROM customers WHERE id = 1', (err, row) => {
      if (row) return
      db.run(addDefaultCustomer)
    })
  })
  db.run(createOrderTable)
  db.run(createOrderlineTable)
})

module.exports = db
