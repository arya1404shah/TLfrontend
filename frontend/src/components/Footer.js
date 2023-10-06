import { Grid, makeStyles, Tooltip, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { SOCIALS } from '../utils/constants'
import IconText from './IconText'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import KVContext from '../context/KVContext'

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      padding: theme.spacing(3),
    },
    pt1: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    pt2: {
      paddingTop: theme.spacing(2)
    },
    pb2: {
      paddingBottom: theme.spacing(2)
    }
  })
)
function Footer() {
  const classes = useStyles()
  const KVStore = useContext(KVContext)
  const { ADDRESS, CONTACT, EMAIL } = KVStore
  return (
    <Grid container className={classes.root} justifyContent="center">
      <Grid container item xs={12} sm={3} justifyContent='center'  className={classes.pt2} component="a" target="_blank" rel="noreferrer" href="https://www.google.com/maps/place/Institute+of+Chemical+Technology+(ICT)/@19.0237512,72.8552556,17z/data=!3m1!4b1!4m5!3m4!1s0x3be7cf2676a9a179:0x32dc932b2b97a570!8m2!3d19.0237512!4d72.8574443">
        <LocationOnIcon />
        <Typography align="center">{ADDRESS}</Typography>
      </Grid>
      <Grid container item xs={12} sm={6} justifyContent='center' className={classes.pt2}>
        <Grid container item xs={12} justifyContent="center"><PhoneIcon /></Grid>
        <Typography align="center">Managers</Typography>
        <Grid container item xs={12} justifyContent="center" className={classes.pt2}>
          <Grid item xs={6}>
            <Typography align="center">Karanveer Singh Khurana</Typography>
            <Typography align="center" component="a" href="tel:+91 86987 72073" style={{display: 'block'}}>
              +91 86987 72073
            </Typography>
            {/* <Tooltip title="19cheu.tyagi@ug.ictmumbai.edu.in" placement="bottom" arrow>
              <Typography align="center" noWrap component="a" href="mailto:19polh.tambawala@ug.ictmumbai.edu.in" style={{display: 'block'}}>19polh.tambawala@ug.ictmumbai.edu.in</Typography>
            </Tooltip> */}
          </Grid>
          <Grid item xs={6}>
            <Typography align="center">Asrar Maqbool</Typography>
            <Typography align="center" component="a" href="tel:+91 81696 52572" style={{display: 'block'}}>
              +91 81696 52572
            </Typography>
            {/* <Tooltip title="19cheu.tyagi@ug.ictmumbai.edu.in" placement="bottom" arrow>
              <Typography align="center" noWrap component="a" href="mailto:19cheu.tyagi@ug.ictmumbai.edu.in" style={{display: 'block'}}>19cheu.tyagi@ug.ictmumbai.edu.in</Typography>
            </Tooltip> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={3} justifyContent="space-around" className={classes.pt2}>
        <Grid container item xs={12} justifyContent="center" className={classes.pb2}>
          <Grid item container xs={12} justifyContent="center"><EmailIcon /></Grid>
          <Typography align="center" noWrap component="a" href={`mailto:${EMAIL}`} style={{display: 'block'}}>{EMAIL}</Typography>
        </Grid>
        {
          SOCIALS.map((item, idx) => {
            const ICON = item[1]
            return (
              <a href={item[2]} target="_blank" rel="noreferrer" key={idx}>
                <ICON style={{height: 30, width: 30}}/>
              </a>
            )
          })
        }
      </Grid>
      <Typography align="center" fullWidth variant="subtitle2" className={classes.pt2}>Copyright © 2022 - All Rights Reserved | Tinkerers’ Lab ICT Mumbai</Typography>
    </Grid>
  )
}

export default Footer