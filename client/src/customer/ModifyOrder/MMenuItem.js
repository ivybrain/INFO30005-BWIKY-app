import {
  Typography,
  Card,
  Grid,
  CardMedia,
  Button,
  CardContent,
  CardActions,
} from '@material-ui/core'

// Menu items for the modify order page
const MMenuItem = (props) => {
  const { menuItem, modifiedOrder, setModifiedOrder } = props

  const handleAddToOrder = (e) => {
    if (modifiedOrder) {
      e.preventDefault()
      console.log(`add ${menuItem.item_name} to order`)
      console.log(modifiedOrder)

      // Is this item already in the items dict?
      let newModifiedOrder = JSON.parse(JSON.stringify(modifiedOrder))
      const _id = menuItem._id
      //   console.log(_id)
      let found = false
      newModifiedOrder.items.forEach((itemDict) => {
        // console.log(itemDict.item)
        if (itemDict.item === _id) {
          found = true
          console.log('found the right thing')
          if (itemDict.hasOwnProperty('quantity')) {
            // Increment it's quantity
            itemDict.quantity++
          }
        }
      })

      if (!found) {
        // Add a new item to items with quantity 1
        console.log('add new item with q 1')
        let newItems = JSON.parse(JSON.stringify(newModifiedOrder.items))
        newItems.push({ quantity: 1, item: _id })
        newModifiedOrder = {
          ...newModifiedOrder,
          items: newItems,
        }
      }
      setModifiedOrder(newModifiedOrder)
    }
  }

  const handleRemoveFromOrder = (e) => {
    e.preventDefault()
    console.log(`remove 1 ${menuItem.item_name} from order`)

    // Is this item already in the items array?
    let newModifiedOrder = JSON.parse(JSON.stringify(modifiedOrder))
    const _id = menuItem._id
    newModifiedOrder.items.forEach((itemDict, idx) => {
      // console.log(itemDict.item)
      if (itemDict.item === _id) {
        //   console.log('found the right thing')
        if (itemDict.hasOwnProperty('quantity')) {
          // Increment it's quantity
          itemDict.quantity--
          // remove the item if it's quantity is 0
          if (itemDict.quantity === 0) {
            newModifiedOrder.items.splice(idx, 1)
          }
        }
      }
    })

    setModifiedOrder(newModifiedOrder)
  }

  return (
    <Grid item>
      <Card variant="outlined" style={{ width: '100%' }}>
        <CardMedia
          component="img"
          image={`http://${menuItem.item_image_url}`}
          title="Menu Item"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {menuItem.item_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${menuItem.item_price}
          </Typography>
          {modifiedOrder ? (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={
                modifiedOrder.items.filter(
                  (orderItem) => orderItem.item === menuItem._id,
                ).length > 0
                  ? modifiedOrder.items.filter(
                      (orderItem) => orderItem.item === menuItem._id,
                    )[0].quantity > 0
                    ? { color: '#e69705' }
                    : {}
                  : {}
              }
            >
              {modifiedOrder.items.filter(
                (orderItem) => orderItem.item === menuItem._id,
              ).length > 0
                ? modifiedOrder.items.filter(
                    (orderItem) => orderItem.item === menuItem._id,
                  )[0].quantity
                : 0}{' '}
              in current order
            </Typography>
          ) : null}
        </CardContent>
        <CardActions>
          <Button style={{ margin: 'auto' }} onClick={handleAddToOrder}>
            <Typography variant="button" display="block" gutterBottom>
              Add to Order
            </Typography>
          </Button>
        </CardActions>
        <CardActions>
          <Button style={{ margin: 'auto' }} onClick={handleRemoveFromOrder}>
            <Typography variant="button" display="block" gutterBottom>
              Remove from Order
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default MMenuItem
