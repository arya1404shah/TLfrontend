import React, { useContext, useState } from 'react'


import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { Button, makeStyles, Dialog, DialogTitle, DialogContent, Grid, DialogActions } from '@material-ui/core';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { URLs } from '../utils/constants'

import AuthContext from '../context/AuthContext'
import CalendarPicker from './CalendarPicker';
import TimeInput from './TimeInput'
import TeamSelection from './TeamSelection';

// PENDING:
// Toast Notifications

const useStyles = makeStyles(theme => ({
    root: {
      width: 'fit-content',
      margin: 'auto',
    },
    card: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing(2),
      "& div": {
        borderRadius: theme.spacing(2),
      }
    },
    btn: {
      marginTop: theme.spacing(1)
    },
    mb: {
      marginBottom: theme.spacing(1)
    }
  })
)

function Calendar({ name, machineID }) {
  const classes = useStyles()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  // Date and Time handler
  const [date, setDate] = useState(new Date())
  var end = new Date()
  end.setHours(end.getHours() + 1)
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(end)
  const handleDateChange = (new_date) => { setDate(new_date) }

  // Dropdown, Form, and Modal handler
  const [teamsData, setTeamsData] = useState([])
  const [selectedTeam, setSelectedTeam] = useState("")
  const [open, setOpen] = useState(false)
  const handleOpen  = () => {
    if(teamsData.length === 0) {
      axios.get('/auth/team/')
      .then(res => { setTeamsData(res.data) })
    }
    setOpen(true)
  }
  const handleClose = () => { setOpen(false) }
  
  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault()
    const reqBody = {
      date: date.toISOString().split('T')[0],
      team: selectedTeam,
      start: startTime.toLocaleTimeString('en-US', { hour12: false }),
      end: endTime.toLocaleTimeString('en-US', { hour12: false })
    }
    if(startTime === "" || endTime === "" || selectedTeam === "" || date === "") {
      return ;
    }
    axios.post(`/bookings/machine/${machineID}/`, reqBody)
    .then(res => {
      // Toastify
      console.log(res.data)
      alert('Your slot booking is acknowledged, please wait for the confirmation')
      navigate(URLs.home.route)
    })
    .catch(err => {
      // Toastify
    })
    handleClose()
  }
//const [snack,handlesnack] = useState[false]
  return (
    <>
     {/* <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar open={snackopen} autoHideDuration={6000} onClose={snackhandleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      
      
      <Alert severity="info">Your slot booking is acknowledged, please wait for the confirmation</Alert>
      
    </Stack> */}
    <MuiPickersUtilsProvider utils={DateFnsUtils}>  
      <div className={classes.root}>
        <div className={classes.card}>
          <CalendarPicker date={date} handleDateChange={handleDateChange} />
        </div>
        {
          user.token?
          <Button onClick={handleOpen} className={classes.btn} fullWidth color="primary" variant="contained">
            Book Slot 
          </Button>
          :
          <Link to={URLs.login.route}>
            <Button className={classes.btn} fullWidth color="primary" variant="contained">
              Login
            </Button>
          </Link>
        }
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Slot Booking for {name}</DialogTitle>
        <DialogContent>
          <Grid container justifyContent="space-between" spacing={1}>
            <Grid item xs={12} sm={6} className={classes.mb}>
              <TimePicker 
                value={startTime}
                onChange={(newTime) => setStartTime(newTime)}
                inputVariant="outlined"
                fullWidth
                label="Start Time"
                TextFieldComponent={TimeInput}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.mb}>
              <TimePicker 
                value={endTime}
                onChange={(newTime) => setEndTime(newTime)}
                inputVariant="outlined"
                fullWidth
                label="End Time"
                TextFieldComponent={TimeInput}
              />
            </Grid>
            <Grid item xs={12}>
              {
              teamsData.length === 0? 
              <Link to={URLs.team.route}>
                <Button variant="contained" color="primary">
                  Create a new team
                </Button>
              </Link>
              :
              <TeamSelection 
                selectedTeam={selectedTeam} 
                teamsData={teamsData}
                label="Select Team"
                onChange={(e) => setSelectedTeam(e.target.value)}
              />
              }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <form onSubmit={handleSubmit}>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </form>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
    </>
  )
}

export default Calendar