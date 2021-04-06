import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import VanCard from './VanCard'

const vans = [
  {
    title: 'Tasty Trailer',
    rating: 5,
    distance: 1,
    simpleLocation: 'on Grattan St outside Melbourne Uni',
    longitude: 144.96296,
    latitude: -37.80435,
  },
  {
    title: 'Breakfast on Wheels',
    rating: 2,
    distance: 2.7,
    simpleLocation: 'above the wheels',
    longitude: 144.96896,
    latitude: -37.80835,
  },
]

const NearestVans = (props) => {
  return (
    <Grid container direction="column" justify="space-between" spacing={3}>
      <Grid item>
        <Typography variant="h6" component="p">
          SNACKS near you
        </Typography>

        {vans.map((van) => (
          <Grid item key={van.title}>
            <VanCard
              title={van.title}
              rating={van.rating}
              distance={van.distance}
              simpleLocation={van.simpleLocation}
            ></VanCard>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default NearestVans
