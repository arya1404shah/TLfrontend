import { Card, CardActionArea, CardHeader, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { BackSide, Flippy, FrontSide } from 'react-flippy'
import { Link } from 'react-router-dom'
import { URLs } from '../utils/constants'
const useStyles = makeStyles(theme => ({
    root: {
      height: '100%'
    },
    cardActionRoot: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    img: {
      maxWidth: "100%",
    }
  })
)

function MachineCard({ data }) {
  const classes = useStyles()
  console.log(data)
  return (
    <Link to={URLs.machine_detail.get_route(data.id)}>
    <Flippy
      flipOnHover={true}
      flipOnClick={true}
      flipDirection="horizontal"
      className={classes.root}
    >
      <FrontSide>
        <Card variant="outlined" className={classes.root}>
          <CardActionArea className={classes.cardActionRoot}>
            <Grid container style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
              <img src={data.image} className={classes.img} alt={`${data.name}`}/>
            </Grid>
            <CardHeader 
              title={data.name}
              subheader={data.location}
            />
          </CardActionArea>
        </Card>
      </FrontSide>
      <BackSide>
        <Card variant="outlined" style={{height: "100%", display: "flex", justifyContent: "center", alignItems: 'center'}}>
          <CardActionArea>
            <Grid container item style={{justifyContent: 'center'}}>
              {
                data.video?
                <iframe 
                  width="100%"
                  className={classes.img}
                  src={`https://www.youtube.com/embed/${data.video}`}
                  title="YouTube video player" 
                  frameBorder="0"
                  allow="encrypted-media;" 
                />
                :
                <img src={data.image} alt={data.name} className={classes.img} />
              }
            </Grid>
          </CardActionArea>
        </Card>
      </BackSide>
    </Flippy>
    </Link>
  )
}

export default MachineCard