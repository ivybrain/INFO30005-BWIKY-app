const express = require('express');
const app = express()
const port = 8080


const vendorsR = require('./routes/vendorsR.js');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/vendors', vendorsR);

app.listen(port, function () {
  console.log(`Ready, server running on ${port}`)
})
