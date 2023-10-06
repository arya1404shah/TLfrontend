import React from 'react'
import { Card, CardActionArea, CardHeader, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { URLs } from '../utils/constants'

const useStyles = makeStyles(theme => ({
    img: {
      maxWidth: "100%",
    },
    cardHeader: {
      "& .MuiCardHeader-content": {
        flex: "1 1 auto",
        width: '100%',
    },
    },
  })
)

function BlogCard({ data }) {
  const classes = useStyles()
  return (
    <Link to={URLs.blog_detail.get_route(data.id)}>
    <Card variant="outlined" style={{height: "100%"}}>
      <CardActionArea style={{height: "100%", maxHeight: 500}}>
        <Tooltip title={<Typography variant="subtitle2">{data.title}</Typography>} placement="right">
          <div>
            <CardHeader 
              title={data.title}
              className={classes.cardHeader}
              titleTypographyProps={{
                noWrap: true
              }}
            />
          </div>
        </Tooltip>
        <Grid container justifyContent="center" style={{height: '90%'}}>
          <img src={data.image} className={classes.img} alt={`${data.name}`}/>
        </Grid>
      </CardActionArea>
    </Card>
    </Link>
  )
}

export default BlogCard