import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    img: {
      maxWidth: "100%",
      margin: "auto",
    },
    pl: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    mb: {
      marginBottom: theme.spacing(2)
    },
  }
))

function BlogDetail() {
  const { id } = useParams()
  const classes = useStyles()
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get(`/blogs/${id}/`)
    .then(res => setData(res.data))
  }, [])

  console.log(data.content?data.content.split('\n'):null)
  
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} className={classes.mb}>
        <Typography variant="h2" align="center">
          {data.title}
        </Typography>
        <Typography variant="subtitle2" align="center">
          Created at: {
            data.created?
            data.created.split("T")[0].split('-').reverse().join('-')
            :null
          }
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} container justifyContent="center" className={classes.mb}>
        <img src={data.image} className={classes.img} alt="Blog context" />
      </Grid>
      <Grid item xs={12} sm={9} xl={7} className={classes.pl} >
          {
            data.content?
            data.content.split('\n').map((item, idx) => (
              <Typography variant='body1' key={idx} className={classes.mb} align="justify">
                {item}
              </Typography>
            ))
            :
            <Typography variant='body1'>
              {data.content}
            </Typography>
          }
      </Grid>
    </Grid>
  )
}

export default BlogDetail