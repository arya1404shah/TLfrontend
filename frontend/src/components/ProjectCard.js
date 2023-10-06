import { Avatar, CardContent, CardHeader, Collapse, Grid, IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { ExpandMore } from '@material-ui/icons'
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    width: "100%", 
    display: "flex", 
    flexDirection: "column",
  },
  cardHeader: {
    "& .MuiCardHeader-content": {
      flex: "1 1 auto",
      width: '100%',
    },
  },
  img: {
    maxWidth: "100%",
  },
  textContainer: {
    overflow: "hidden", 
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  // Animations
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.primary,
  }
})
)

function ProjectCard({ data }) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const handleExpand = () => {
    setExpanded(!expanded)
  }
  const { name, description, image, team, start, end } = data
  const start_date = start.split('-').reverse().join('/')
  const end_date   = end.split('-').reverse().join('/')
  return (
    <>
      <Grid item xs={12} style={{height: "100%", display: "flex", flexDirection: "column"}}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {team.name[0]}
            </Avatar>
          }
          title={team.name}
          subheader={team.creator.fname}
        />
        <Grid item container xs={12} justifyContent='center'>
          <img className={classes.img} src={image} alt={name} />
        </Grid>
        <CardContent>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={10}>
              <Tooltip title={<Typography variant="subtitle2">{name}</Typography>} placement="right"> 
                <Typography variant="h6" className={classes.textContainer}>{name}</Typography>
              </Tooltip>
              <Typography variant="subtitle2">({start_date} - {end_date})</Typography>
            </Grid>
            <Grid item>
              <IconButton 
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpand}
              >
                <ExpandMore />
              </IconButton>
            </Grid>
          </Grid>
          <Collapse in={expanded}>
            <Typography>{description}</Typography>
          </Collapse>
        </CardContent>
      </Grid>
    </>
  )
}

export default ProjectCard