CREATE TABLE "products" (
    "sale_price" NUMERIC DEFAULT 0 NOT NULL, 
    `created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, 
    `description` TEXT DEFAULT '' NOT NULL, 
    `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, 
    `name` TEXT DEFAULT '' NOT NULL, 
    "quantity" NUMERIC DEFAULT 0 NOT NULL, 
    `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, 
    "unit" TEXT DEFAULT '' NOT NULL, 
    "category_id" TEXT DEFAULT '' NOT NULL, 
    "buy_price" NUMERIC DEFAULT 0 NOT NULL
)

CREATE TABLE `product_categories` ("name" TEXT DEFAULT '' NOT NULL, `created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, `is_active` BOOLEAN DEFAULT FALSE NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL)

CREATE TABLE `orders` (`created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, "total" NUMERIC DEFAULT 0 NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, "customer_id" TEXT DEFAULT '' NOT NULL, "paid" BOOLEAN DEFAULT FALSE NOT NULL, "total_paid" NUMERIC DEFAULT 0 NOT NULL, "transaction_id" TEXT DEFAULT '' NOT NULL)

CREATE TABLE `orderlines` (`created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, `quantity` NUMERIC DEFAULT 0 NOT NULL, "subtotal" NUMERIC DEFAULT 0 NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, "order_id" TEXT DEFAULT '' NOT NULL, "product_id" TEXT DEFAULT '' NOT NULL)

CREATE TABLE `employees` (`created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, `name` TEXT DEFAULT '' NOT NULL, `role` TEXT DEFAULT '' NOT NULL, `salary` NUMERIC DEFAULT 0 NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL)

CREATE TABLE `customers` (`address` TEXT DEFAULT '' NOT NULL, `created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, `name` TEXT DEFAULT '' NOT NULL, `phone` TEXT DEFAULT '' NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL)

CREATE TABLE `purchaselines` (`created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, `product_id` TEXT DEFAULT '' NOT NULL, `purchase_id` TEXT DEFAULT '' NOT NULL, `quantity` NUMERIC DEFAULT 0 NOT NULL, `subtotal` NUMERIC DEFAULT 0 NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL)

CREATE TABLE `purchases` (`created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, `total` NUMERIC DEFAULT 0 NOT NULL, `total_paid` NUMERIC DEFAULT 0 NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, "transaction_id" TEXT DEFAULT '' NOT NULL, "supplier_id" TEXT DEFAULT '' NOT NULL)

CREATE TABLE `salary_payments` (`created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `employee_id` TEXT DEFAULT '' NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, `paid` BOOLEAN DEFAULT FALSE NOT NULL, `salary` NUMERIC DEFAULT 0 NOT NULL, `transaction_id` TEXT DEFAULT '' NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL)

CREATE TABLE `stocks` (`created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, `product_id` TEXT DEFAULT '' NOT NULL, `quantity` NUMERIC DEFAULT 0 NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL)

CREATE TABLE `suppliers` (`company_name` TEXT DEFAULT '' NOT NULL, `created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, `name` TEXT DEFAULT '' NOT NULL, `phone_number` TEXT DEFAULT '' NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL)

CREATE TABLE `transactions` (`created` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, `id` TEXT PRIMARY KEY DEFAULT ('r'||lower(hex(randomblob(7)))) NOT NULL, `updated` TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL, "amount" NUMERIC DEFAULT 0 NOT NULL, "type" TEXT DEFAULT '' NOT NULL)
