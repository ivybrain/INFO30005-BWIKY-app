import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import VanCard from './VanCard'


// Five nearest vans
const NearestVans = (props) => {
  let { vans } = props

  vans = vans.filter((van) => van.hasOwnProperty('location'))

  return (
    <Grid container direction="column" justify="space-between" spacing={3}>
      <Grid item>
        <Typography variant="h6" component="p">
          SNACKS near you
        </Typography>

        {vans.map((van, idx) => (
          <Grid item key={idx}>
            <VanCard
              key={idx}
              number={idx}
              title={van.van_name}
              rating={van.rating}
              distance={van.distance}
              simpleLocation={van.location.simple}
              _id={van._id}
            ></VanCard>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default NearestVans
