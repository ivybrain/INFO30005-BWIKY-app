import { Card, CardContent, Typography } from '@material-ui/core'

const Order = (props) => {
  const { order } = props
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Order
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price here
        </Typography>
        {order.items.map((item) => (
          <p>{item.item_name}</p>
        ))}
      </CardContent>
    </Card>
  )
}

export default Order
