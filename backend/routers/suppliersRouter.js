const db = require('../db/database')
const { executeReadSQLQuery } = require('../db/helperQueries')

const suppliersRouter = require('express').Router()

suppliersRouter.get('/suppliers', (req, res) => {
  const sql = 'SELECT * FROM suppliers WHERE id != 1'
  executeReadSQLQuery(sql, [], (result) => {
    if (result.status === 'failed') {
      res.status(400).json(result)
    } else {
      res.json(result)
    }
  })
})

suppliersRouter.post('/suppliers', (req, res) => {
  const { name, company_name, phone_number } = req.body

  db.run(
    'INSERT INTO suppliers (name, company_name, phone_number) VALUES (?, ?, ?)',
    [name, company_name, phone_number],
    function (err) {
      if (err) {
        return res.status(400).json({
          status: 'failed',
          message: err.message,
        })
      }

      db.get(
        'SELECT * FROM suppliers WHERE id = ?',
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

suppliersRouter.patch('/suppliers/:id', (req, res) => {
  const { id } = req.params
  const { name, company_name, phone_number } = req.body
  const sql = `UPDATE suppliers
    SET name = ?,
    company_name = ?,
    phone_number = ?
    WHERE id = ?
    `
  // console.log(req.body)
  db.run(sql, [name, company_name, phone_number, id], function (err) {
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

module.exports = suppliersRouter
