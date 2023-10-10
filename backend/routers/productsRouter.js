const productsRouter = require('express').Router()
const { executeReadSQLQuery } = require('../db/helperQueries')
const db = require('../db/database')

productsRouter.get('/products', (req, res) => {
  const sql = `SELECT p.id, p.name, p.description, s.in_stock, s.sold, s.loss, p.sale_price, 
    p.buy_price, p.unit, c.name as category_name, c.id as category_id 
    FROM products as p 
    LEFT JOIN categories as c ON p.category_id = c.id 
    LEFT JOIN stocks as s ON s.product_id = p.id ORDER BY p.name`

  executeReadSQLQuery(sql, [], (result) => {
    if (result.status === 'failed') {
      res.status(400).json(result)
    } else {
      res.json(result)
    }
  })
})

productsRouter.get('/products/in-stock', (req, res) => {
  const sql = `SELECT p.id, p.name, p.description, s.in_stock, s.sold, s.loss, p.sale_price, \
  p.buy_price, p.unit, c.name as category_name, c.id as category_id \
  FROM products as p \
  LEFT JOIN categories as c ON p.category_id = c.id \
  LEFT JOIN stocks as s ON s.product_id = p.id 
  WHERE s.in_stock > 0
  ORDER BY p.name 
  `

  executeReadSQLQuery(sql, [], (result) => {
    if (result.status === 'failed') {
      res.status(400).json(result)
    } else {
      res.json(result)
    }
  })
})

productsRouter.post('/products', (req, res) => {
  const { name, sale_price, buy_price, description, category_id, unit } =
    req.body
  const sql = `INSERT INTO products (name, description, unit, sale_price, buy_price, category_id) VALUES (?, ?, ?, ?, ?, ?)`

  db.run(
    sql,
    [name, description, unit, sale_price, buy_price, category_id],
    function (err) {
      if (err) {
        return res.status(400).json({
          status: 'failed',
          message: err.message,
        })
      }

      const productId = this.lastID
      const stockSQL = `INSERT INTO stocks (product_id, in_stock) VALUES (?, ?)`

      db.run(stockSQL, [productId, 0], function (err) {
        if (err) {
          return res.status(400).json({
            status: 'failed',
            message: err.message,
          })
        }
        res.status(201).json({
          status: 'success',
          data: this.lastID,
        })
      })
    },
  )
})

productsRouter.patch('/products/:id', (req, res) => {
  const { name, sale_price, buy_price, description, category_id, unit } =
    req.body
  const { id } = req.params
  const sql = `UPDATE products
  SET name = ?,
  sale_price = ?,
  buy_price = ?,
  description = ?,
  category_id = ?,
  unit = ? WHERE id = ?`

  db.run(
    sql,
    [name, sale_price, buy_price, description, category_id, unit, id],
    function (err) {
      if (err) {
        return res.status(400).json({
          status: 'failed',
          message: err.message,
        })
      }
      res.status(201).json({
        status: 'success',
        data: this.lastID,
      })
    },
  )
})

module.exports = productsRouter
