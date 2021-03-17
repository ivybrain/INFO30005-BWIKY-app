import React from 'react'
import VanCard from './VanCard'

const NearestVans = (props) => {
  return (
    <>
      <VanCard
        title="Tasty Trailer"
        rating={5}
        distance="4.3"
        simpleLocation="on Grattan St outside Melbourne Uni"
      ></VanCard>
      <VanCard
        title="Breakfast on Wheels"
        rating={4}
        distance="4.3"
        simpleLocation="above the wheels"
      ></VanCard>
    </>
  )
}

export default NearestVans
