import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    // width: 500,
    clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 50%)',
    overflow: 'hidden',
    paddingLeft: "max(15%, 75px)",
    left: -75,
    // minWidth: 220,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "max(15%, 35px)",
      left: -35
    },
  },
  img: {
    width: 150, height: 150,
    [theme.breakpoints.down('xs')]: {
      width: 70, height: 70,
    },
    borderRadius: "50%",
    objectFit: 'cover',
    position: 'relative',
    zIndex: 10
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(3),
    maxWidth: '100%',
  },
  btn: {
    display: 'block', margin: 'auto',
    marginTop: theme.spacing(2),
    width: 200
  }
}));

export default function EventCard({title, img, text, link}) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img src={img} className={classes.img} />
      <Card className={classes.root}>
        <CardHeader
          title={title}
        />
        <CardContent>
          {text}
          <a href={link} target="_blank" rel="noreferrer">
            <Button className={classes.btn}> Register Now </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}