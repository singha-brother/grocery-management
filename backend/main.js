const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const productsRouter = require('./routers/productsRouter')
const categoriesRouter = require('./routers/categoriesRouter')
const suppliersRouter = require('./routers/suppliersRouter')
const operationsRouter = require('./routers/operationsRouter')
const purchasesRouter = require('./routers/purchasesRouter')
const customersRouter = require('./routers/customersRouter')
const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', productsRouter)
app.use('/api', categoriesRouter)
app.use('/api', suppliersRouter)
app.use('/api', operationsRouter)
app.use('/api', purchasesRouter)
app.use('/api', customersRouter)

const port = 3000
app.listen(port, () => {
  console.log('http://127.0.0.1:3000')
})
