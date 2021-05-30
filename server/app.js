const express = require('express')
const cors = require('cors')

// Configure environment variables
const dotenv = require('dotenv')
const dotenv_expand = require('dotenv-expand')
var env = dotenv.config()
dotenv_expand(env)


// Create the app and add the database adapter
const app = express()

app.mongoose = require('mongoose')


// Configure access control
app.use(cors())

// Import the routers for each resource
const vendorsR = require('./routes/vendorsR.js')
const itemsR = require('./routes/itemsR.js')
const customersR = require('./routes/customersR.js')
const configR = require('./routes/configR.js')


// App parsing options
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use the routers for their designated routes
app.use('/vendors', vendorsR)
app.use('/items', itemsR)
app.use('/customers', customersR)
app.use('/config', configR)

// Serve images and public assets
app.use(express.static('public'))

// Provide a function to establish database connection
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
