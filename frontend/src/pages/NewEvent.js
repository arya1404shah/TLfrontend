import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import KVContext from '../context/KVContext'

const useStyles = makeStyles(theme => ({
    media: {
      height: "70vh"
    },
  })
)

function NewEvent() {
  const classes = useStyles()
  const [eventData, setEventData] = useState([])
  useEffect(() => {
    axios.get('/misc/events/')
    .then(res => setEventData(res.data))
  }, [])
  return (
    <Grid container justifyContent="center" alignItems='center' style={{
      flexGrow: 1, alignSelf: 'stretch', 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      color: 'white',
    }}>
      <Grid container item xs={12} md={8} justifyContent="center">
        {
          eventData.length?
          eventData.map((item, idx) => (
              <EventCard 
                title={item.title}
                text={item.text}
                img={item.img}
                link={item.link}
              />
            )
          )
          :
          <Typography variant="h2" align="center">Looks like there are no new events yet!</Typography>
        }
        
      </Grid>
    </Grid>
  )
}

export default NewEvent