import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Card, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import TeamList from '../components/TeamList'
import TeamCreate from '../components/TeamCreate'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2),
      maxHeight: '100%',
    }
  })
)


function Team() {
  const classes = useStyles()
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/auth/team/')
    .then(res => {
      setData(res.data)
    })
  }, [])

  const [newTeam, setNew] = useState(false)
  const toggleView = () => {
    setNew(!newTeam)
  }
  return (
    <Grid container item xs={12} sm={8} lg={6}>
      <Grid container item xs={12} alignContent="flex-start" component={Card} className={classes.root} spacing={2}>
        
        <Grid container item xs={12}>
          {newTeam?
            <IconButton onClick={() => setNew(false)}>
              <ArrowBackIcon />
            </IconButton>
            : null
          }
          <Typography variant="h3" align="center" style={{flexGrow: 1}}>
            {newTeam?"Create Team":"Your teams"}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {
            newTeam?<>
              <TeamCreate />
            </>
            :(
              <>
                <TeamList data={data} />
                <Grid item style={{margin: "auto"}} xs={12} sm={4}>
                  <Button variant="contained" color="primary" onClick={toggleView} fullWidth> Add Team </Button>   
                </Grid>
              </>
            )
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Team