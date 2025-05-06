import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const API_URL = `${SERVER_URL}/api/auth`;

const authService = {
	async login(email, password) {
		// Implement login logic here
		const response = await axios.post(`${API_URL}/login`, { email, password });
		if (!response.data) {
			return null;
		}
		
		return response.data;
	},

	async register(userData) {
		// Implement register logic here
		const response = await axios.post(`${API_URL}/register`, userData);
		
		if (!response.data) {
			return null;
		}
		return response.data;
	},

	async logout() {
		// Implement logout logic here
		const response = await axios.post(`${API_URL}/logout`);
		if (!response.data) {
			return null;
		}
		return true;
	},
};

export default authService;
