import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/stylesheets/index.css'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000"
// axios.defaults.baseURL = "https://tlictdev.pythonanywhere.com"

axios.interceptors.request.use(function(config) {
	const token = localStorage.getItem("token");
	if(token)
		config.headers.Authorization = `Token ${token}`;
	return config;
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
