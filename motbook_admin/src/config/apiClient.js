// apiClient.js
import axios from 'axios';
import { API_BASE_URL } from '../config';
import useAuthStore from '../features/auth/stores/authStore';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(config => {
    const { user } = useAuthStore.getState();
    
    const token = user?.data?.accessToken;
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Attach interceptor
apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { getNewAccessToken, user } = useAuthStore.getState();
                const refreshToken = user?.data?.refreshToken;

                const res = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, { refreshToken });
                const { accessToken } = res.data.data.accessToken;
                getNewAccessToken(accessToken);
                
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return apiClient(originalRequest);
            } catch (err) {
                window.location.href = '/auth/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);




export default apiClient;
