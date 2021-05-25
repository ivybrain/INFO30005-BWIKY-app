require('../app')

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');

var customer_ids = [];
var order_ids = [];

Customer.find({}, (err, list) => {
  customer_ids = list.map(x => x._id)

  Order.find({}, (err, orders) => {
    order_ids = orders.map(x=>x._id)

    for (var i=0; i<order_ids.length; i++) {
      Order.findByIdAndUpdate(order_ids[i], {"customer": customer_ids[i%customer_ids.length]}, () => {
        return;
      })
    }

  })


});
