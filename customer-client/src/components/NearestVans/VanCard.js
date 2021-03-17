import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@material-ui/core'
import Ratings from 'react-ratings-declarative'

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    // height: '100%',
    // width: '100%',
  },
  content: {
    // display: 'flex',
    // flexDirection: 'column',
    // margin: 'auto',
  },
  distanceText: {
    float: 'right',
  },
}))

const VanCard = (props) => {
  const styles = useStyles()

  return (
    <Card className={styles.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={2}>
          <CardMedia
            component="img"
            className={styles.media}
            image={'foodTrucks/foodTruck.jpg'}
            title="Food Truck"
          ></CardMedia>
        </Grid>

        <Grid item xs={4}>
          <CardContent className={styles.content}>
            <Typography variant="h5" component="h2" className={styles.content}>
              {props.title}
            </Typography>
            <Typography variant="body1" component="p">
              {props.simpleLocation}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={4}>
          <CardContent className={styles.content}>
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
        </Grid>

        <Grid item xs={2}>
          <CardContent>
            <Typography
              variant="body1"
              component="p"
              className={styles.distanceText}
            >
              Distance: {props.distance}km
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default VanCard
