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
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'black',
  },
  distanceText: {
    float: 'right',
  },
}))

const VanCard = (props) => {
  const styles = useStyles()

  const distance =
    props.distance < 2
      ? 'Within 2km from you!'
      : Math.round(props.distance * 10) / 10 + 'km from you'

  // console.log(styles, 'styles')

  return (
    <Card className={styles.root} classes={{}} style={{ marginTop: '40px' }}>
      <Card
        component={Link}
        to={`/customer/van/${props._id}`}
        style={{ textDecoration: 'none' }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={12} md={2}>
            <CardMedia
              component="img"
              image={`/foodTrucks/foodTruck${props.number + 1}.jpg`}
              title="Food Truck"
            ></CardMedia>
          </Grid>

          <Grid item xs={12} md={4}>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                className={styles.content}
              >
                {props.title}
              </Typography>
              <Typography variant="body1" component="p">
                {props.simpleLocation}
              </Typography>
            </CardContent>
          </Grid>

          <Grid item md={4} xs={12}>
            <CardContent>
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

          <Grid item md={2} xs={12}>
            <CardContent>
              <Typography
                variant="body1"
                component="p"
                className={styles.distanceText}
              >
                {distance} -- click to view menu!
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Card>
  )
}

export default VanCard
