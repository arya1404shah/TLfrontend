import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Card, makeStyles, TextField, Button } from '@material-ui/core'
import TeamSelection from '../components/TeamSelection'
import { useNavigate } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { URLs }from '../utils/constants'
const useStyles = makeStyles(theme => ({
    root: {},
    mb: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    },
  })
)

function ProjectCreate() {
  const classes = useStyles()
  const navigate = useNavigate()
  const [teamsData, setTeamsData] = useState([])
  const [data, setData] = useState({
    name: "",
    description: "",
    team: "",
    image: {name: ""},
    start: new Date(),
    end: new Date(),
  })
  const handleStartChange = (new_date) => {
    setData({...data, start: new_date})
  }
  const handleEndChange = (new_date) => {
    setData({...data, end: new_date})
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  const handleFileChange = (e) => {
    setData({
      ...data,
      image: e.target.files[0]
    })
  }

  useEffect(() => {
    axios.get('/auth/team/')
    .then(res => { setTeamsData(res.data) })
  }, [])
  console.log(data)
  const handleSubmit = () => {
    if(data.name === "" || data.description === "" || data.team === "" || data.image.name === "") {
      // Toast Notification
      return ;
    }
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('team', data.team)
    formData.append('image', data.image)
    formData.append('start', data.start.toISOString().split('T')[0])
    formData.append('end', data.end.toISOString().split('T')[0])
    axios.post('/projects/', formData)
    .then(res => {
      navigate(URLs.projects.route)
    })
    .catch(err => console.log(err.response))
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>  
    <Grid container item xs={12} sm={8} lg={6}>
      <Grid container item xs={12} alignContent="flex-start" component={Card} className={classes.root} spacing={2}>
        <Grid item container xs={12} component="form" justifyContent="center">
        <Grid item xs={12} sm={8} className={classes.mb}>
            <TextField
              name="name"
              label="Project Name"
              value={data.name}
              onChange={handleChange}
              variant="outlined" 
              fullWidth 
            />
          </Grid>
          <Grid container item xs={12} sm={8} spacing={1} className={classes.mb}>
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                fullWidth
                disableFuture
                date={data.start}
                value={data.start}
                onChange={handleStartChange}
                label="Start Date"
                inputVariant="outlined"
                format="dd/MM/yyyy"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                fullWidth
                disableFuture
                date={data.end}
                value={data.end}
                onChange={handleEndChange}
                label="End Date"
                inputVariant="outlined"
                format="dd/MM/yyyy"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} className={classes.mb}>
            <TextField
              minRows={4}
              multiline
              name="description"
              label="Project Description"
              value={data.description}
              onChange={handleChange}
              variant="outlined" 
              fullWidth 
            />
          </Grid>
          
          <Grid item xs={12} sm={8} className={classes.mb}>
            <TeamSelection 
              selectedTeam={data.team} 
              teamsData={teamsData}
              label="Select Team"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={8} className={classes.mb}>
            <TextField
              variant="outlined"
              label="Project Image"
              name="image"
              fullWidth
              value={data.image.name}
              disabled
              className={classes.mb}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="field-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="field-file">
              <Button variant="outlined" component="span" fullWidth>
                Add Image
              </Button>
            </label>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default ProjectCreate