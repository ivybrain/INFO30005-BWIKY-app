import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import Ratings from 'react-ratings-declarative'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    height: '100px',
  },
  media: {
    height: '100%',
    width: '150px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
}))

const VanCard = (props) => {
  const styles = useStyles()

  return (
    <Card className={styles.root}>
      <CardMedia
        component="img"
        className={styles.media}
        image={'foodTrucks/foodTruck.jpg'}
        title="Food Truck"
      ></CardMedia>

      <CardContent className={styles.content}>
        <Typography variant="h5" component="h2" className={styles.content}>
          {props.title}
        </Typography>
        <Typography variant="body1" component="p">
          {props.simpleLocation}
        </Typography>
        <Ratings
          rating={parseFloat(props.rating)}
          widgetDimensions="30px"
          widgetSpacings="8px"
        >
          <Ratings.Widget widgetRatedColor="orange"></Ratings.Widget>
          <Ratings.Widget widgetRatedColor="orange"></Ratings.Widget>
          <Ratings.Widget widgetRatedColor="orange"></Ratings.Widget>
          <Ratings.Widget widgetRatedColor="orange"></Ratings.Widget>
          <Ratings.Widget widgetRatedColor="orange"></Ratings.Widget>
        </Ratings>
      </CardContent>
    </Card>
  )
}

export default VanCard
