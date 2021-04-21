const express = require('express')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
const dotenv_expand = require('dotenv-expand')
var env = dotenv.config()
dotenv_expand(env)

const app = express()

const vendorsR = require('./routes/vendorsR.js')
const itemsR = require('./routes/itemsR.js')
const ordersR = require('./routes/ordersR.js')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/vendors', vendorsR)
app.use('/items', itemsR)
app.use('/', ordersR)
app.use(express.static('public'))

app.listen(process.env.PORT, function () {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  console.log(`Ready, server running on ${process.env.PORT}`)
})
