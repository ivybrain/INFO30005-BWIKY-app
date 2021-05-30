// Helper functions used across customer and vendor apps

// Convert a list into a dictionary with ids as keys
export function dictify(list) {
  var out = {}
  if (list) {
    list.forEach((x) => (out[x._id] = x))
  }
  return out
}

// Display all items in an order as a string (with items and their quantities)
export function stringifyItems(order, itemDict) {
  var string = ''
  var item_name = ''
  var quantity = 0
  var i

  if (order && Object.keys(itemDict).length !== 0) {
    for (i = 0; i < order.items.length; i++) {
      item_name = itemDict[order.items[i]['item']]['item_name']
      quantity = order.items[i].quantity
      string += item_name + ' ' + 'x' + quantity + ' '
    }
  }

  return string
}

export function checkModifyWindow(time, modify_limit) {
  const modified_time = new Date(time)
  const current_time = new Date()

  if (current_time - modified_time <= modify_limit * 60000) {
    return true // Customer can modify/cancel within window
  } else {
    return false // Customer cannot modify order
  }
}

// Format date and time, return as string
export function formatDateTime(datetime) {
  // Split via spaces
  var strings = new Date(datetime).toString().split(' ')

  // Get hours and minutes only
  const new_time = strings[4].slice(0, 5)

  // Get new date and time as string
  var new_datetime = ''
  var i = 0

  for (i = 0; i < 4; i++) {
    new_datetime = new_datetime + strings[i] + ' '
  }

  new_datetime = new_datetime + new_time

  return new_datetime
}

// Format time as xx:xx (hours and minutes) and return a string
export function formatTime(time) {
  var hours = new Date(time).getHours()
  var minutes = new Date(time).getMinutes()

  if (hours < 10) {
    var temp = hours
    hours = '0' + temp
  }

  if (minutes < 10) {
    var temp = minutes
    minutes = '0' + temp
  }

  return hours + ':' + minutes
}

// Check whether a discount needs to be applied to an order (which is late)
export function checkDiscount(order, time_limit) {
  const fulfilled_time = new Date(order.fulfilled_time)
  const modified_time = new Date(order.modified)
  const current_time = new Date()

  if (order.fulfilled) {
    if (fulfilled_time - modified_time > time_limit * 60000) {
      console.log('Checking Discount')
      console.log((fulfilled_time - modified_time).toString())
      return true // Apply discount
    } else {
      return false // No discount
    }
  } else {
    if (current_time - modified_time > time_limit * 60000) {
      console.log('Checking Discount')
      return true // Apply discount
    } else {
      return false // No discount
    }
  }
}

// Get time the order is due to be fulfilled without being late
export function getDeadline(order, time_limit) {
  var new_time = new Date(order.modified)
  new_time.setMinutes(new_time.getMinutes() + time_limit)

  return formatTime(new_time)
}

// Countdown how many minutes:seconds remaining till a discount needs to be applied
export function getTimeRemaining(order, time_limit) {
  const limit = time_limit * 60000 // time limit in milliseconds

  const current_time = new Date()
  const modified_time = new Date(order.modified)

  var countdown = limit - (current_time - modified_time)

  const minutes = Math.trunc(countdown / 1000 / 60) // convert milliseconds to minutes
  const seconds = Math.trunc((countdown / 1000) % 60) // convert milliseconds to seconds

  if (countdown > 0) {
    return minutes.toString() + ':' + seconds.toString()
  } else {
    return '0:00'
  }
}
