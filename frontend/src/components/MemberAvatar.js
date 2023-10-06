import React, { useState } from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import { alpha } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
    m2: { margin: theme.spacing(2), height: '100%' },
    root: { 
      height: '100%', width: "100%", overflowWrap: 'break-word',
    },
    offset: { position: 'relative', top: '14.5vh', color: 'white' },
    divider: { height: 5, backgroundColor: 'white', width: '100%', maxWidth: 400, margin: 'auto' },
    content: {
      height: '100%',
      backgroundColor: 'transparent', boxShadow: 'none',
      display: 'flex', 
      flexDirection: 'column',
      // justifyContent: 'space-between',
      // alignItems: 'space-between'
    },
    overlap: {
      height: '100%',
      position: 'relative', 
      bottom: theme.spacing(5),
      backgroundColor: alpha(theme.palette.background.default, 0.85),
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.primary.dark}`,
      paddingLeft: theme.spacing(1), paddingRight: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    overlapTitle: {
      // marginBottom: theme.spacing(1.75),
      // fontWeight: 'bold'
    },
    mb1: {
      marginBottom: theme.spacing(0.25),
    },
    dividerOverlap: {
      marginBottom: theme.spacing(1.75),
      height: 0,
      backgroundColor: 'white'
    }
  })
)

function MemberAvatar({name, image, position, quote, xs, sm, md, lg, size, overlap, noMargin}) {
  const classes = useStyles()
  const [textOpen, setTextOpen] = useState(false)
  console.log(textOpen)
  return (
    <Grid item xs={xs || 12} sm={sm || 4} md={md || 4} lg={lg || 2} className={noMargin?null:classes.m2}>
    <Flippy
      className={classes.root}
    >
      <FrontSide className={classes.content}>
          <div 
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: `cover`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center top',
              width:size, height: size,
              borderRadius: "50%",
              margin: 'auto'
            }}
          />
          {
            overlap?
            <div className={classes.overlap} 
              style={{
                width: size+90, 
                maxHeight: '50%',
              }}
            >
              <div>
                <Typography variant="h4" align="center"> {name} </Typography>
                <Typography variant="body1" align="center">{position}</Typography>
                <Divider className={`${classes.dividerOverlap}`}/>
              </div>
              <div>
              { quote?
                quote.split('\n').map((item, idx) => (
                  <Typography variant='body1' align="center" key={idx} className={classes.mb1}>
                    {item}
                  </Typography>
                ))
                :
                <Typography variant='body1' align="center">{quote}</Typography>
              }
              </div>
            </div>
            :
            <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
              <Typography variant="h4" align="center"> {name} </Typography>
              <Divider className={`${classes.divider}`}/>
              <Typography variant="body1" align="center">{position}</Typography>
            </div>
          }
      </FrontSide>
    </Flippy>
    </Grid>
  )
}

export default MemberAvatar