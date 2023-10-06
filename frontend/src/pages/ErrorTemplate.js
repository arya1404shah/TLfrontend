import { Button, Grid, Hidden, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(5)
    }
  })
)

function ErrorTemplate({ image, content, errCode, attribution }) {
  const classes = useStyles()
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Hidden smUp>
        <Grid item xs={12} sm={6}>
            {image}
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={6}>
        <Typography component="p" variant="h3" color="textPrimary">
        Oops! Error - {errCode}
        </Typography>
        <Typography component="p" variant="h4" gutterBottom>
          {content}
        </Typography>
        <Link to="/">
          <Button variant="contained" color="primary">
            Go back home  
          </Button>
        </Link>
      </Grid>
      <Hidden xsDown>
        <Grid item container justifyContent="center" xs={12} sm={6}>
          {image}
        </Grid>
      </Hidden>
      <div style={{display: 'none'}}>
        {attribution}
      </div>
    </Grid>
  )
}

export default ErrorTemplate