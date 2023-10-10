const db = require('../db/database')
const { executeReadSQLQuery } = require('../db/helperQueries')

const categoriesRouter = require('express').Router()

categoriesRouter.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM categories'
  executeReadSQLQuery(sql, [], (result) => {
    if (result.status === 'failed') {
      res.status(400).json(result)
    } else {
      const categories = result.items.map((item) => ({
        name: item.name,
        id: item.id,
        is_active: item.is_active,
      }))
      res.json({
        status: 'success',
        items: categories,
      })
    }
  })
})

categoriesRouter.post('/categories', (req, res) => {
  const { name, is_active } = req.body

  db.run(
    'INSERT INTO categories (name, is_active) VALUES (?, ?)',
    [name, is_active],
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

categoriesRouter.patch('/categories/:id', (req, res) => {
  const { id } = req.params
  const { name, is_active } = req.body
  const sql = `UPDATE categories
  SET name = ?,
  is_active = ?
  WHERE id = ?
  `

  db.run(sql, [name, is_active, id], function (err) {
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

module.exports = categoriesRouter
