import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import BlogCard from '../components/BlogCard'
import FadeInText from '../components/FadeInText'

const useStyles = makeStyles(theme => ({
  title: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 600 // between normal and bold
  },
}))

function BlogList() {
  const [data, setData] = useState([])
  const classes = useStyles()
  useEffect(() => {
    axios.get('/blogs/')
    .then(res => setData(res.data))
  }, [])
  
  return (
    <Grid container justifyContent="space-around" spacing={5}>
      <Typography className={classes.title} variant="h2" align="center">
        <FadeInText>
          Tinker Talks
        </FadeInText>
			</Typography>
      {
        data.map(blog => (
          <Grid item xs={12} sm={4} lg={4} key={blog.id}>
            <BlogCard data={blog} />
          </Grid>
          )
        )
      }
    </Grid>
  )
}

export default BlogList