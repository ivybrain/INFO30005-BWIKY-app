const express = require('express');
const app = express()
const port = 8080


const vendorsR = require('./routes/vendorsR.js');

app.use('/vendors', vendorsR);

app.listen(port, function () {
  console.log('Ready')
})
