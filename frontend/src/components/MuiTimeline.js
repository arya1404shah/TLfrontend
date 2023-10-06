import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useState } from 'react';


export default function MuiTimeline({ itemsFullData }) {
  const theme = useTheme();
  const [items, setItems] = useState([])
  useEffect(() => {
    setItems(itemsFullData.slice(0,1))
  }, [itemsFullData])
  
  const contentStyle = {
    padding: '6px 16px',
    background: theme.palette.background.paper,
    display: 'flex', flexDirection: 'column',
  }
  const arrowStyle = { 
    borderRight: `7px solid ${theme.palette.text.primary}` 
  }
  const iconStyle = (idx) => ({ 
    background: idx%2?theme.palette.primary.main:theme.palette.secondary.main,
  })
  const iconCenter = {
    display: "flex", justifyContent: 'center', alignItems: 'center'
  }
  const loadMore = () => {
    setItems(itemsFullData.slice(0, items.length+1))
  }
  const imgStyle = {maxWidth: "100%", paddingTop: theme.spacing(1) ,paddingBottom: theme.spacing(1), margin: 'auto'}
  return (
    <VerticalTimeline>
      {
        items.map((item,idx) => (
          <VerticalTimelineElement
            contentStyle={contentStyle}
            contentArrowStyle={arrowStyle}
            iconStyle={{...iconStyle(idx), ...iconCenter}}
            icon={<Typography style={{}}>{item.year}</Typography>}
            className='vertical-timeline-element--work'
          >
            <img src={item.img} style={imgStyle} alt="Display"/>
            <Typography variant="h5" className="vertical-timeline-element-title">{item.title}</Typography>
            {/* <Typography variant="h6" className="vertical-timeline-element-subtitle">{item.subtitle}</Typography> */}
            <Typography>
              {item.content}
            </Typography>
          </VerticalTimelineElement>
        ))
      }
      <VerticalTimelineElement
        iconOnClick={loadMore}
        iconStyle={iconStyle(items.length)}
        icon={<AddIcon />}
      />
    </VerticalTimeline>
  );
}
