const db = require('./database')

function executeReadSQLQuery(sql, params, callback) {
  db.all(sql, params, (err, rows) => {
    if (err) {
      callback({
        status: 'failed',
        message: err.message,
      })
    } else {
      callback({
        status: 'success',
        items: rows,
      })
    }
  })
}

module.exports = { executeReadSQLQuery }
