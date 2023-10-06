import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FadeInText from '../components/FadeInText'
import ProjectCard from '../components/ProjectCard'

const useStyles = makeStyles(theme => ({
  title: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 600 // between normal and bold
  },
  m3: {
    padding: theme.spacing(5),
  }
}))


function ProjectList() {
  const [projects, setProjects] = useState([])
  const classes = useStyles()
  useEffect(() => {
    axios.get('/projects/')
    .then(res => setProjects(res.data))
  }, [])

  return (
    <Grid container justifyContent='space-around'>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h2" align="center">
          <FadeInText>
            Projects
          </FadeInText>
        </Typography>
      </Grid>
      {
        projects.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id} className={classes.m3}>
            <Paper variant="outlined" style={{height: "100%"}}>
              <ProjectCard data={item} />
            </Paper>
          </Grid>
        )
      )
      }
    </Grid>
  )
}

export default ProjectList