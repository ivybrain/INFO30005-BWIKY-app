import {
  Typography,
  Card,
  Grid,
  CardMedia,
  Button,
  CardContent,
  CardActions,
} from '@material-ui/core'

const MenuItem = (props) => {
  const { menuItem, order, setOrder } = props

  const handleAddToOrder = (e) => {
    e.preventDefault()
    console.log(`add ${menuItem.item_name} to order`)

    // Is this item already in the items array?
    let newOrder = JSON.parse(JSON.stringify(order))
    const _id = menuItem._id
    if (newOrder.items.hasOwnProperty(menuItem._id)) {
      // Increment it's quantity
      newOrder.items[_id].quantity++
      setOrder(newOrder)
    } else {
      // Add a new item to items with quantity 1
      let newItems = JSON.parse(JSON.stringify(newOrder.items))
      const { item_price, item_name } = menuItem
      newItems[_id] = { quantity: 1, item_price, item_name }
      newOrder = {
        ...newOrder,
        items: newItems,
      }
      setOrder(newOrder)
    }

    console.log(order)
  }

  return (
    <Grid item>
      <Card variant="outlined" style={{ width: '280px' }}>
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
        </CardContent>
        <CardActions>
          <Button style={{ margin: 'auto' }} onClick={handleAddToOrder}>
            <Typography variant="button" display="block" gutterBottom>
              Add to Order
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default MenuItem
