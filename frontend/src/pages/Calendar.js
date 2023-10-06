import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MuiTimeline from '../components/MuiTimeline'
import MemberAvatar from '../components/MemberAvatar'
import CustomCarousel from '../components/CustomCarousel'
import { URLs } from '../utils/constants'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  carouselImg: {
    maxWidth: '100%',
    maxHeight: '60vh'
  },
  carouselContainer: {
    height: 'fit-content',
    width: '100%',
  },
  root: {
    marginBottom: theme.spacing(4)
  },
  btn: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  title: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    fontWeight: 600 // between normal and bold
  },
  pt: {
    paddingTop: theme.spacing(5),
    // paddingBottom: theme.spacing(1),
  }
}))

function Calendar() {
  const [data, setData] = useState([])
  const [carousel, setCarousel] = useState([])
  const [timeline, setTimeline] = useState([])
  const classes = useStyles()
  useEffect(() => {
    axios.get('/misc/about/')
    .then(res => {
      setData(res.data.members)
      setCarousel(Object.values(res.data.carousel))
      setTimeline(Object.values(res.data.timeline))
    })
  }, [])

  return (
    <Grid container className={classes.root} justifyContent='center' alignItems='center' direction="column">
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={12}>
          <Typography className={classes.title} variant='h2' align='center'>Journey of TL</Typography>
        </Grid>
        <MuiTimeline itemsFullData={timeline} />
      </Grid>
      {/* Gallery */}
      <Typography className={`${classes.title} ${classes.pt}`} variant="h2" align="center">Gallery</Typography>
      <Grid container item xs={12} justifyContent='center' className={classes.carouselContainer}>
        <CustomCarousel 
          imgs={carousel}
          className={classes.carouselImg}
          carouselContainerClass={classes.carouselContainer}
        />
      </Grid>
      {/* Meet the team */}
      <Typography className={classes.title} variant='h2' align='center'>Meet the team!</Typography>
      <Grid container item xs={12} sm={12} md={12} lg={12} xl={8} justifyContent='center'>
        {
          data.map((member, idx) => (
            <MemberAvatar 
              key={idx} 
              name={member.name} 
              position={member.post}
              image={member.image} 
              quote={member.quote}
              flipOnClick={false} 
              lg={4}
              md={4} // At 1000px width, double line occurs on Prof name
              sm={10}
              xs={10}
              size={200}
              noMargin
              maxWidth
            />
          ))
        }
        <Grid container item xs={12} justifyContent="center">
          <Link to={URLs.know_more.route}>
            <Button variant="contained" color="secondary" className={classes.btn}>Know More</Button>
          </Link>
        </Grid>
      </Grid>
        {/* Gallery */}
    </Grid>
  )
}

export default Calendar
