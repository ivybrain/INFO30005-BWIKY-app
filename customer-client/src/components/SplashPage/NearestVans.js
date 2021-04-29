import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import VanCard from './VanCard'

const NearestVans = (props) => {
  let { vans } = props
  console.log(vans)
  vans = vans
    .filter((van) => van.hasOwnProperty('location'))
    .map((van) => ({
      ...van,
      simpleLocation: 'above the wheels',
      rating: 4,
      distance:
        Math.round(
          Math.sqrt(van.location.lat ** 2 + van.location.long ** 2) * 10,
        ) / 10,
    }))
  return (
    <Grid container direction="column" justify="space-between" spacing={3}>
      <Grid item>
        <Typography variant="h6" component="p">
          SNACKS near you
        </Typography>

        {vans.map((van, idx) => (
          <Grid item key={van.title}>
            <VanCard
              key={van.title}
              number={idx}
              title={van.van_name}
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
