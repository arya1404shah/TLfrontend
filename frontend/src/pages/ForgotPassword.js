import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    maxWidth: 400,
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === '') {
      setEmailError(true);
      return;
    }
    axios.post('/auth/forgot-password/', { email })
      .then((response) => {
        console.log(response.data);
        // show success message to user
      })
      .catch((error) => {
        console.error(error);
        // show error message to user
      });
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? 'Please enter a valid email address' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

export default ForgotPassword;
