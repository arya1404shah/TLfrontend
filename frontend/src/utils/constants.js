import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';

export const URLs = {
	home: {
		display: "Home",
		route: "/",
	},
	login: {
		display: false,
		route: "/login/",
	},
	signup: {
		display: false,
		route: "/signup/",
	},
	forgot_password: {
		display: false,
		route: "/forgot-password/",
	},
	blogs: {
		display: "Tinker\xa0Talks",
		route: "/tinker-talks/",
		featured: true,
	},
	blog_detail: {
		display: false,
		route: "/tinker-talks/:id",
		get_route: (id) => `/tinker-talks/${id}/`,
	},
	projects: {
		display:"Projects",
		route: "/projects/",
		featured: true,
	},
	machines: {
		display: "Inventory",
		route: "/inventory/",
		featured: true,
	},
	machine_detail: {
		display: false,
		route: "/inventory/:id",
		get_route: (id) => `/inventory/${id}/`,
	},
	new_events: {
		display: "Events",
		route: "/upcoming-events/",
		featured: true,
	},
	not_found: {
		display: false,
		route: "*",
	},
	profile: {
		display: false,
		route: "/profile/"
	},
	team: {
		display: false,
		route: "/team/"
	},
	project_create: {
		display: false,
		route: "/projects/create/",
	},
	about_us: {
		display: `About\xa0Us`,
		route: "/about-us/",
	},
	contact_us: {
		display: "Contact\xa0Us",
		route: "/#contact-us",
		scroll: true,
	},
	faqs: {
		display: "FAQs",
		route: "/faqs/",
		featured: true,
	},
	know_more: {
		display: false,
		route: "/about-us/all-members/",
	},
	all_members: {
		display: false,
		route: "/about-us/all-members/:year",
		get_route: (year) => `/about-us/all-members/${year}/`,
	},
	calender: {
		display: false,
		route: "/calender"
	}
}

export const SOCIALS = [
	// ['Facebook', FacebookIcon],
	['LinkedIn', LinkedInIcon, 'https://www.linkedin.com/company/tinkerers-laboratory-ict-mumbai/'],
	['Instagram', InstagramIcon, 'https://instagram.com/tinkererslab.ictmumbai?igshid=MWM2YjBjM2Q='],
	['YouTube', YouTubeIcon, 'https://youtube.com/@tinkererslab.ictmumbai'],
]

export const defaultKV = {
	ADDRESS: "Nathalal Parekh Marg, near Khalsa College, Matunga, Mumbai, Maharashtra 400019",
	CONTACT: "022 3361 2222",
	EMAIL: "contact@tinkerers.com",
	TITLE:"Tinkerer's Lab",
	FACEBOOK: "", TWITTER: "", LINKEDIN: "", INSTAGRAM: "",
	LOGIN_BG: "teal",
	HOME_TEXT: "Explore different machines through Tinkerer's Lab. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
	HOME_IMG: "https://mobimg.b-cdn.net/v3/fetch/62/624e27fde335d49e2dd3c6b75c6027a3.jpeg"
}