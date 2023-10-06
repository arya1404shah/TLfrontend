import { Grid, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Calendar from '../components/Calendar'

const useStyles = makeStyles(theme => ({
    media: {
      height: "70vh"
    },
    mb: {
      marginBottom: theme.spacing(1)
    }
  })
)

function MachineDetail() {
  const classes = useStyles()
  const { id } = useParams()
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get(`/machines/${id}/`)
    .then(res => setData(res.data))
  }, [])
  
  return (
    <Grid container>
      <Grid item xs={12}>
        {
          data.video?
          <iframe 
            width="100%"
            className={classes.media} 
            src={`https://www.youtube.com/embed/${data.video}`}
            title="YouTube video player" 
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
          :
          <img src={data.image} alt={data.name} className={classes.media} />
        }
      </Grid>
      <Grid container item xs={12} className={classes.pad}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2">{data.name}</Typography>

          {
            data.description?
            data.description.split('\n').map((item, idx) => (
              <Typography variant='body1' key={idx} className={classes.mb}>
                {item}
              </Typography>
            ))
            :
            <Typography variant='body1'>
              {data.description}
            </Typography>
          }
          {/* <Typography variant="body1">{data.description}</Typography> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Calendar name={data.name} machineID={id} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MachineDetail