const express = require('express')
const cors = require('cors')

const dotenv = require('dotenv')
const dotenv_expand = require('dotenv-expand')
var env = dotenv.config()
dotenv_expand(env)

const app = express()

app.mongoose = require('mongoose')

// const cors_options = {
//   origin: [/localhost\:3000$/, /.*/],
//   methods: ['GET', 'PATCH', 'POST', 'DELETE']
//
// }

app.use(cors(/*cors_options*/))


const vendorsR = require('./routes/vendorsR.js')
const itemsR = require('./routes/itemsR.js')
const customersR = require('./routes/customersR.js')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/vendors', vendorsR)
app.use('/items', itemsR)
app.use('/customers', customersR)
app.use(express.static('public'))

app.connect = async () => {

  await app.mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
     async (err) => {
      console.log(err)
    },
  );
};

module.exports = app;
