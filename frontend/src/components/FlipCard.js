import React from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Divider, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    m2: { margin: theme.spacing(2) },
    root: { 
      height: '35vh', width: "100%", overflowWrap: 'break-word',
      transitionDuration: "0.05s",
      "&:hover": {
        transform: "scale(1.1, 1.1)"
      }
    },
    offset: { position: 'relative', top: '14.5vh', color: 'white' },
    divider: { height: 5, backgroundColor: 'white' },
    content: { overflowY: 'clip', backgroundColor: theme.palette.background.paper },
    
  })
)

function FlipCard({name, image, position, quote, flipOnClick, xs, sm, md, lg, tooltip}) {
  const classes = useStyles()
  return (
    <Grid item xs={xs || 12} sm={sm || 4} md={md || 4} lg={lg || 2} className={classes.m2}>
    <Flippy
      flipOnHover={false}
      flipOnClick={flipOnClick}
      flipDirection="horizontal"
      className={classes.root}
    >
      <FrontSide
        className={classes.content}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <Typography variant="h4" className={classes.offset}>
          {name}
        </Typography>
        <Divider className={`${classes.offset} ${classes.divider}`}/>
        <Typography variant="h6" className={classes.offset}>
          {position}
        </Typography>
      </FrontSide>
      <BackSide
        className={classes.content}
      >
        <Tooltip title={<Typography align="center"> {quote} </Typography>} placement="right">
          <Typography align="center"> {quote} </Typography>
        </Tooltip>
      </BackSide>
    </Flippy>
    </Grid>
  )
}

export default FlipCard