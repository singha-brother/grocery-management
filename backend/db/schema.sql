CREATE TABLE "categories" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"is_active"	BOOLEAN,
    "created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "products" (
  "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "description"	TEXT,
  "name"	TEXT NOT NULL,
  "unit"	TEXT,
  "sale_price"	INTEGER,
  "buy_price"	INTEGER,
  "category_id"	INTEGER,
  "created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
  FOREIGN KEY("category_id") REFERENCES "categories"("id")
)

CREATE TABLE IF NOT EXISTS "stocks" (
  "id"    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "in_stock" NUMERIC DEFAULT 0 NOT NULL,
  "sold" NUMERIC DEFAULT 0 NOT NULL,
  "loss" NUMERIC DEFAULT 0 NOT NULL,
  "product_id" INTEGER,
  "created" TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
  FOREIGN KEY("product_id") REFERENCES "products"("id")
)

CREATE TABLE IF NOT EXISTS "suppliers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "company_name" TEXT DEFAULT '',
    "phone_number" TEXT DEFAULT ''
)

CREATE TABLE "purchaselines" (
	"id"	INTEGER NOT NULL UNIQUE,
	"product_id"	INTEGER,
	"purchase_id"	INTEGER,
	"quantity"	INTEGER,
	"subtotal"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("product_id") REFERENCES "products"("id"),
	FOREIGN KEY("purchase_id") REFERENCES "purchases"("id")
);

CREATE TABLE IF NOT EXISTS "purchases" (
	"id"	INTEGER NOT NULL UNIQUE,
	"total"	INTEGER NOT NULL,
	"total_paid"	INTEGER NOT NULL,
	"supplier_id"	INTEGER,
	"transation_id"	INTEGER,
	FOREIGN KEY("transation_id") REFERENCES "transactions"("id"),
	FOREIGN KEY("supplier_id") REFERENCES "suppliers"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "transactions" (
	"id"	INTEGER NOT NULL UNIQUE,
	"type"	TEXT,
	"amount"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "customers" (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone_number" TEXT DEFAULT ''
)

CREATE TABLE "orderlines" (
	"id"	INTEGER NOT NULL UNIQUE,
	"product_id"	INTEGER,
	"order_id"	INTEGER,
	"quantity"	INTEGER,
	"sale_price"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("product_id") REFERENCES "products"("id"),
	FOREIGN KEY("order_id") REFERENCES "orders"("id")
);

CREATE TABLE IF NOT EXISTS "orders" (
	"id"	INTEGER NOT NULL UNIQUE,
	"total"	INTEGER NOT NULL,
	"total_paid"	INTEGER NOT NULL,
	"customer_id"	INTEGER,
	"transation_id"	INTEGER,
	FOREIGN KEY("transation_id") REFERENCES "transactions"("id"),
	FOREIGN KEY("customer_id") REFERENCES "customers"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);