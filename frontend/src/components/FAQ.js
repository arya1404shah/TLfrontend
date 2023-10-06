import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontWeight: "bold"
  },
  container: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderLeft:`1px solid ${theme.palette.divider}`,
    borderRight:`1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(1)
  }
}));

function FAQ({question, answer}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = () => {
    setExpanded(!expanded)
  };
  return (
    <Accordion expanded={expanded} onChange={handleChange} className={classes.container}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="subtitle1" className={classes.heading}>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default FAQ