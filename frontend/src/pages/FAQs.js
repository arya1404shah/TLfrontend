import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import FAQ from '../components/FAQ';

const useStyles = makeStyles((theme) => ({
    headingSection: {
      marginBottom: theme.spacing(2)
    },
    heading: {
      marginBottom: theme.spacing(1)
    },
  }
))

function FAQs() {
  const classes = useStyles()
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/misc/faq/')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} className={classes.headingSection}>
        <Typography variant="h3" align="center" className={classes.heading}>How can we help?</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={9}>
      {
        data.map(item => (
            <FAQ question={item.question} answer={item.answer} />
          )
        )
      }
      </Grid>
    </Grid>
  )
}

export default FAQs