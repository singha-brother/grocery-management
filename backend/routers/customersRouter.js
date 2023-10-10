const db = require('../db/database')
const { executeReadSQLQuery } = require('../db/helperQueries')

const customersRouter = require('express').Router()

customersRouter.get('/customers', (req, res) => {
  const sql = 'SELECT * FROM customers WHERE id != 1'
  executeReadSQLQuery(sql, [], (result) => {
    if (result.status === 'failed') {
      res.status(400).json(result)
    } else {
      res.json(result)
    }
  })
})

customersRouter.post('/customers', (req, res) => {
  const { name, phone_number } = req.body

  db.run(
    'INSERT INTO customers (name, phone_number) VALUES (?, ?)',
    [name, phone_number],
    function (err) {
      if (err) {
        return res.status(400).json({
          status: 'failed',
          message: err.message,
        })
      }

      db.get(
        'SELECT * FROM customers WHERE id = ?',
        [this.lastID],
        function (err, row) {
          if (err) {
            return res.status(400).json({
              status: 'failed',
              message: err.message,
            })
          }
          res.status(201).json({
            status: 'success',
            data: row,
          })
        },
      )
    },
  )
})

customersRouter.patch('/customers/:id', (req, res) => {
  const { id } = req.params
  const { name, phone_number } = req.body
  const sql = `UPDATE customers
    SET name = ?,
    phone_number = ?
    WHERE id = ?
    `
  // console.log(req.body)
  db.run(sql, [name, phone_number, id], function (err) {
    if (err) {
      return res.status(400).json({
        status: 'failed',
        message: err.message,
      })
    }

    res.status(204).json({
      status: 'success',
      data: this.lastID,
    })
  })
})

module.exports = customersRouter
