const db = require('../db/database')

const operationsRouter = require('express').Router()

operationsRouter.post('/operation/purchase', (req, res) => {
  const {
    itemsToPurchase,
    totalPrice,
    totalPaid,
    supplierId,
    transactionType,
  } = req.body

  const saveTransactionSQL =
    'INSERT INTO transactions (type, amount) VALUES (?, ?)'
  const saveTransactionParams = [transactionType, totalPaid]

  db.run(saveTransactionSQL, saveTransactionParams, function (err) {
    if (err) {
      return res.status(400).json({
        status: 'failed',
        message: err.message,
      })
    }
    const transactionId = this.lastID
    const savePurchaseSQL =
      'INSERT INTO purchases (total, total_paid, supplier_id, transaction_id) VALUES (?,?,?,?)'
    const savePurchaseParams = [
      totalPrice,
      totalPaid,
      supplierId,
      transactionId,
    ]
    db.run(savePurchaseSQL, savePurchaseParams, function (err) {
      if (err) {
        return res.status(400).json({
          status: 'failed',
          message: err.message,
        })
      }
      const purchaseId = this.lastID

      const queryPurchaselinePromise = new Promise((resolve, reject) => {
        const placeholders = itemsToPurchase
          .map((item) => '(?,?,?,?)')
          .join(',')
        const savePurchaselineSQL =
          'INSERT INTO purchaselines (product_id, purchase_id, quantity, buy_price) VALUES ' +
          placeholders
        const savePurchaselineParams = itemsToPurchase.flatMap((item) => [
          item.product.id,
          purchaseId,
          item.count,
          item.product.buy_price,
        ])
        db.run(savePurchaselineSQL, savePurchaselineParams, function (err) {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })

      const queryStockPromise = new Promise((resolve, reject) => {
        const updateStockSQL =
          'UPDATE stocks SET in_stock = in_stock + ? WHERE id = ?'
        itemsToPurchase.map((item) => {
          db.run(updateStockSQL, [item.count, item.product.id], function (err) {
            if (err) reject(err)
            else resolve()
          })
        })
      })

      Promise.all([queryPurchaselinePromise, queryStockPromise])
        .then(() => {
          res.json({
            status: 'success',
          })
        })
        .catch((err) => {
          res.status(400).json({
            status: 'failed',
            message: err.message,
          })
        })
    })
  })
})

module.exports = operationsRouter
