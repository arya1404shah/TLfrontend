import React, { useEffect, useState } from 'react'
import { Card, Grid, makeStyles, Typography, CardActionArea, CardContent } from '@material-ui/core'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { URLs } from '../utils/constants'

const useStyles = makeStyles((theme) => ({
    root: {
      width: 'fit-content',
      marginBottom: theme.spacing(3),
    },
    p1: {
      padding: theme.spacing(1),
      boxShadow: `0 0 ${theme.spacing(1)}px ${theme.spacing(0.5)}px ${theme.palette.secondary.main}`
    }
  })
)


function KnowMore() {
  const classes = useStyles()
  const [years, setYears] = useState([])

  useEffect(() => {
    axios.get('/misc/year-list/')
    .then(res => {
      setYears(res.data.map(item => item.year))
    })
  }, [])

  
  return (
    <Grid container item justifyContent='center'>
      { 
        years.map((item, idx) => (
          <Grid container item xs={10} key={idx} justifyContent="center">
            <CardActionArea className={classes.root}>
              <Link to={URLs.all_members.get_route(item)}>
                <Card className={classes.p1}>
                  <CardContent>
                    <Typography variant="h3">
                      {
                        item===2022?
                        "Founding Committee"
                        :
                        `Batch of ${item}-${item+1}`
                      }
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </CardActionArea>
            <CardActionArea className={classes.root}>
              <Link to={URLs.all_members.get_route(item)}>
                <Card className={classes.p1}>
                  <CardContent>
                    <Typography variant="h3">
                      {
                        item===2023?
                        "TL Core 1"
                        :
                        `Batch of ${item}-${item+1}`
                      }
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </CardActionArea>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default KnowMore