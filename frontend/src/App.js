import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MachineDetail from "./pages/MachineDetail";
import MachineList from "./pages/MachineList";
import ProjectList from "./pages/ProjectList";
import Template from "./pages/Template";
import AuthContext from './context/AuthContext'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogList from "./pages/BlogList";
import BlogDetail from './pages/BlogDetail';
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import Calendar from "./pages/Calendar";
import ProjectCreate from "./pages/ProjectCreate";
import { getUser, parseKVData } from "./utils/utils";
import { defaultKV, URLs } from './utils/constants';
import axios from "axios";
import KVContext from "./context/KVContext";
import RequireAuth from './components/RequireAuth'
import AboutUs from "./pages/AboutUs";
import FAQs from "./pages/FAQs";
import NewEvent from "./pages/NewEvent";
import { ThemeProvider } from '@material-ui/core'
import defaultTheme from './theme/defaultTheme';
import AllMembers from "./pages/AllMembers";
import KnowMore from "./pages/KnowMore";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
	const [user, setUser] = useState(getUser())
	const [KVStore, setKVStore] = useState(defaultKV)
  const AuthData = {user, setUser}
	useEffect(() => {
		axios.get('/misc/key-values/')
		.then(res => {
			const newKVStore = parseKVData(res.data)
			setKVStore({...KVStore, ...newKVStore})
		})
	}, [])
	return (
		<ThemeProvider theme={defaultTheme}>
		<KVContext.Provider value={KVStore}>
		<AuthContext.Provider value={AuthData}>
			<BrowserRouter>
				<Routes>
					<Route path={URLs.home.route} element={<Template noPadding active={URLs.home.display}><Home /></Template>} />
					{/* route for calender */}
					<Route path={URLs.calender.route} element={<Template noPadding active={URLs.home.display}><Calendar /></Template>} />
					<Route path={URLs.projects.route} element={<Template active={URLs.projects.display}><ProjectList /></Template>} />
					<Route path={URLs.machines.route} element={<Template active={URLs.machines.display}><MachineList /></Template>} />
					<Route path={URLs.machine_detail.route} element={<Template active={URLs.machines.display}><MachineDetail /></Template>} />
					<Route path={URLs.login.route} element={<Template noFooter active={URLs.login.display}><Login /></Template>} />
					<Route path={URLs.signup.route} element={<Template noFooter active={URLs.signup.display}><Signup /></Template>} />
					<Route path={URLs.blogs.route} element={<Template active={URLs.blogs.display}><BlogList /></Template>} />
					<Route path={URLs.blog_detail.route} element={<Template active={URLs.blogs.display}><BlogDetail /></Template>} />
					<Route path={URLs.new_events.route} element={<Template noPadding noFooter active={URLs.new_events.display}><NewEvent /></Template>} />
					<Route path={URLs.faqs.route} element={<Template active={URLs.faqs.display}><FAQs /></Template>} />
					<Route path={URLs.about_us.route} element={<Template active={URLs.about_us.display}><AboutUs /></Template>} />
					<Route path={URLs.know_more.route} element={<Template active={URLs.about_us.display}><KnowMore /></Template>} />
					<Route path={URLs.all_members.route} element={<Template active={URLs.about_us.display}><AllMembers /></Template>} />
					<Route path={URLs.project_create.route} element={
						<RequireAuth>
							<Template><ProjectCreate /></Template>
						</RequireAuth>
					} />
					<Route path={URLs.profile.route} element={
						<RequireAuth>
							<Template><Profile /></Template>
						</RequireAuth>
					} />
					<Route path={URLs.team.route} element={
						<RequireAuth>
							<Template><Team /></Template>
						</RequireAuth>
					} />
					<Route path={URLs.forgot_password.route} element={<Template><ForgotPassword /></Template>} />
					<Route path={URLs.not_found.route} element={<Template><NotFound /></Template>} />
				</Routes>
			</BrowserRouter>	
		</AuthContext.Provider>
		</KVContext.Provider>
		</ThemeProvider>
	);
}

export default App;
