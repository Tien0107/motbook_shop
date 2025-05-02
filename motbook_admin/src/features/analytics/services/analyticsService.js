import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const API_URL = `${SERVER_URL}/api/analytics`;
const analyticsService = {
    async getAnalytics() {
        const response = await axios.get(`${API_URL}/dashboard`);
        return response.json();
    }
};

export default analyticsService;