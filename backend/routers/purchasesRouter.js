const { executeReadSQLQuery } = require('../db/helperQueries')

const purchasesRouter = require('express').Router()

purchasesRouter.get('/purchases/all', (req, res) => {
  const sql = `SELECT 
    p.id, p.total, p.total_paid, 
    p.created,
    CASE
        WHEN total = total_paid THEN 'paid'
        WHEN total_paid < total THEN 'debt'
        ELSE '-'
    END AS is_paid,
    s.name, s.company_name, s.phone_number 
    FROM purchases as p 
    LEFT JOIN suppliers as s 
    ON p.supplier_id = s.id 
    ORDER BY p.created DESC
    `
  // WHERE strftime('%Y-%m-%d', p.created) = '2023-10-08'

  executeReadSQLQuery(sql, [], (result) => {
    if (result.status === 'failed') {
      res.status(400).json(result)
    } else {
      //   // TMP FAKE
      //   const numberOfCopies = 3000 // Change this to the desired number of copies
      //   const fakeData = result.items.map((item) => {
      //     const copies = []
      //     for (let i = 0; i < numberOfCopies; i++) {
      //       copies.push({ ...item }) // Create a shallow copy of the original object
      //     }
      //     return copies
      //   })

      //   // Merge the copies into a single array
      //   const finalFakeData = [].concat(...fakeData)
      //   return res.json({
      //     status: 'success',
      //     items: finalFakeData,
      //   })
      //   // TMP END
      res.json(result)
    }
  })
})

purchasesRouter.get('/purchases/details/:id', (req, res) => {
  const purchaseId = req.params.id
  const sql = `SELECT pl.quantity, pl.buy_price, 
        p.name, p.unit
    FROM purchaselines as pl 
    LEFT JOIN  products as p
        ON pl.product_id = p.id
    WHERE pl.purchase_id = ?;
    `

  executeReadSQLQuery(sql, [purchaseId], (result) => {
    if (result.status === 'failed') {
      res.status(400).json(result)
    } else {
      res.json(result)
    }
  })
})

module.exports = purchasesRouter
