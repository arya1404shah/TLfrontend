import { Button, Grid, Hidden, makeStyles, Typography, Modal, Box } from '@material-ui/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation';
import FlipCard from '../components/FlipCard'
import axios from 'axios'
import KVContext from '../context/KVContext'
import { URLs } from '../utils/constants'
import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'


import LogoImage from '../assets/images/logo.png'
import HeroImage from '../assets/images/hero.png'
import CustomCarousel from '../components/CustomCarousel'

import AnimatedText from 'react-animated-text-content';
import TinkerersLabText from '../components/TinkerersLabText'
import FadeInText from '../components/FadeInText';

const useStyles = makeStyles(theme => ({
	img: {
		maxHeight: 300,
		width: "auto",
		maxWidth: "100%",
		marginTop: theme.spacing(2),
	},
	title: {
		width: "100%",
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(1),
		fontWeight: 600 // between normal and bold
	},
	carouselImg: {
		height: '80vh',
		maxWidth: '100%',
	},
	carouselContainer: {
		marginTop: theme.spacing(7),
		marginBottom: theme.spacing(2),
	},
	btn: {
		marginTop: theme.spacing(2),
		// marginLeft: theme.spacing(1),
	},
	hero: {
		padding: theme.spacing(8), //6 on large screens
		minHeight: `calc(100vh - 64px)`, //64 = toolbar height
		// paddingBottom: theme.spacing(18),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(3),
			// paddingBottom: theme.spacing(12),
		},
	},
	hometext: {
		paddingLeft: theme.spacing(1),
		// marginLeft: theme.spacing(1),
		borderLeft: `${theme.spacing(0.75)}px solid ${theme.palette.primary.main}`,
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	hometitle: {
		fontWeight: 'bold'
	},
	pb1: { paddingBottom: theme.spacing(3) },
	p1: { padding: theme.spacing(4) },
	px4: { paddingLeft: theme.spacing(4), paddingRight: theme.spacing(4), paddingTop: theme.spacing(4) },
	alignmentFix: {
		textAlign: 'justify',
		[theme.breakpoints.down('sm')]: {
			textAlign: 'left'
		},
	}
})
)

const style = {
	position: 'absolute',
	color: '#fff',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

function Home() {



	const classes = useStyles()
	const [testimonials, setTestimonials] = useState([])
	const [carousel, setCarousel] = useState([])
	const [loaded, setLoaded] = useState(false)

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		axios.get('/misc/home/')
			.then(res => {
				setTestimonials(res.data.testimonials)
				setCarousel(res.data.carousel)
				setLoaded(true)
			})
	}, [])

	return (
		<Grid container justifyContent="center" className={classes.pb1}>
			{/* Welcome Section */}
			<Grid container alignItems="center" className={classes.hero} style={{
				backgroundImage: `linear-gradient(rgba(47, 58, 212, 0.5), rgba(7, 6, 7, 1)), url(${HeroImage})`,
				backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
			}}>
				<Grid item xs={12} md={8}>
					<Typography variant="h1" className={classes.hometitle} display="block" style={{ overflowX: 'hidden' }}>
						<TinkerersLabText />
					</Typography>
					<Typography variant="h5" color="textPrimary" className={classes.hometext} gutterBottom>
						<TypeAnimation
							// Same String at the start will only be typed once, initially
							sequence={[
								750,
								'Where curiosity meets creativity.',
								1000,
								'Where curiosity meets chemistry.',
								1000,
								'Where curiosity meets ingenuity.',
								1000,
							]}
							speed={40} // Custom Speed from 1-99 - Default Speed: 40
							// style={{ fontSize: '2em' }}
							wrapper="span" // Animation will be rendered as a <span>
							repeat={Infinity} // Repeat this Animation Sequence infinitely
						/>

						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={style}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Terms & Conditions
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									By booking a slot for a given machine, I and my team (if any) will adhere to all safety protocols, procedures and wear adequate safety gear to use the machine. If I (and any of my team members) fail to do so, any injuries/ fatalities caused by the same, will not be Tinkerer's Lab ICT's responsibility
								</Typography>
								<Link to={URLs.machines.route}>
								<Button>Accept</Button>
								</Link>
							</Box>
						</Modal>

					</Typography>
					{/* <Link to={URLs.machines.route} onClick={handleOpen}>
						<Button className={classes.btn} color="primary" variant="contained">Book a slot</Button>
					</Link> */}
					{/* <Link onClick={handleOpen}> */}
						<Button className={classes.btn} color="primary" variant="contained" onClick={handleOpen}>Book a slot</Button>
					{/* </Link> */}
				</Grid>
			</Grid>
			{/* Description */}
			<Grid container justifyContent="space-around">
				<Hidden mdUp>
					<Grid item md={5}
						style={{
							backgroundImage: `url(${LogoImage})`,
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
							height: '500px',
							width: '100%'
						}}
					/>
				</Hidden>
				<Grid container item md={5}>
					<Typography
						className={`${classes.title} ${classes.px4}`}
						align="center"
						variant="h2"
					>
						<FadeInText>
							Tinker Tales
						</FadeInText>
					</Typography>
					<Typography variant="h6" component="p" fullWidth className={`${classes.px4} ${classes.alignmentFix}`}>
						An initiative of the Maker Bhavan Foundation, the Tinkerers' Laboratory aims to foster curiosity, experimentation, and problem-solving by providing the first-ever opportunity for budding engineers to tinker with systems and design and develop their own prototypes.
						<br /><br />
						Being the first of its kind, the Tinkerers' Lab ICT Mumbai is a  24/7 facility accessible to all, with an in-built flexibility that allows students to balance their curricular commitments and explore their co-curricular interests with cutting-edge technology. We aim to nurture and grow the tribe of problem-solvers in the student community by introducing tinkering as a path to advanced engineering and manufacturing practices.
					</Typography>
				</Grid>
				<Hidden smDown>
					<Grid item sm={5}
						style={{
							backgroundImage: `url(${LogoImage})`,
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center'
						}}
					/>
				</Hidden>
			</Grid>
			{/* Carousel */}
			<Grid container justifyContent='center' className={classes.carouselContainer}>
				<Typography className={classes.title} variant="h2" align="center">
					<FadeInText>
						Gallery
					</FadeInText>
				</Typography>
				<Grid item xs={12}>
					<CustomCarousel imgs={carousel} className={classes.carouselImg} />
				</Grid>
			</Grid>
			{/* Testimonials */}
			<Typography className={classes.title} variant="h2" align="center">
				<FadeInText>
					Testimonials
				</FadeInText>
			</Typography>
			<Grid container justifyContent='center' item xs={12} md={10} lg={8}> {/* style={{backgroundColor: "rgba(15,15,15,0.4)"}}*/}
				{/* <Grid item xs={10} container justifyContent="center"> */}
				{
					testimonials.map((testimonial, idx) => (
						<FlipCard
							key={idx}
							name={testimonial.name}
							position={testimonial.position}
							image={testimonial.image}
							quote={testimonial.quote}
							flipOnClick={true}
							lg={3}
							tooltip
						/>
					))
				}
			</Grid>
			{/* Contact Us */}
			<Typography className={classes.title} variant="h2" align="center">
				<FadeInText>
					Let's Talk!
				</FadeInText>
			</Typography>
			<Grid id="contact-us" container justifyContent='center' xs={12} sm={8} md={6} xl={5}>
				<ContactForm />
			</Grid>
		</Grid>
	)
}

export default Home