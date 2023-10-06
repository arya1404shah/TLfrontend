import { useTheme } from '@material-ui/core'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Grid } from '@material-ui/core'

function CustomCarousel({imgs, className, carouselContainerClass}) {
	const carouselBtnColor = useTheme().palette.secondary.main
  return (
    <Carousel 
        animation="slide"
        navButtonsAlwaysVisible={true}
        navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: carouselBtnColor
          }
      }} 
      // autoPlay={false}
      className={carouselContainerClass}
      // stopAutoPlayOnHover={false} // Change to true and reduce time alternatively
    >
      {
        imgs.map((img, idx) => (
          <Grid container justifyContent="center" key={idx}>
            <img src={img.image} className={className} alt="Carousel" />	
          </Grid>
        ))
      }
    </Carousel>
  )
}

export default CustomCarousel