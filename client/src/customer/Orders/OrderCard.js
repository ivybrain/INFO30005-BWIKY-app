import { Card, CardContent, Typography } from '@material-ui/core'

const OrderCard = (props) => {
  const { order } = props
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Order {order._id}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Bought from {order.vendor}
        </Typography>
        {order.items.map((item) => (
          <p>{item.item_name}</p>
        ))}
      </CardContent>
    </Card>
  )
}

export default OrderCard
