import { Grid, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FadeInText from '../components/FadeInText'
import MachineCard from '../components/MachineCard'

const useStyles = makeStyles(theme => ({
  title: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 600 // between normal and bold
  },
}))

function MachineList() {
  const [data, setData] = useState([])
const classes = useStyles()

  useEffect(() => {
    axios.get('/machines/all/')
    .then(res => setData(res.data))
  }, [])

  return (
    <Grid container justifyContent="space-around">
      <Typography className={classes.title} variant="h2" align="center">
        <FadeInText>
          Inventory
        </FadeInText>
      </Typography>
      {
        data.map(machine => (
          <Grid item xs={12} sm={4} lg={3} key={machine.id}>
            <MachineCard data={machine} />
          </Grid>
          )
        )
      }
    </Grid>
  )
}

export default MachineList