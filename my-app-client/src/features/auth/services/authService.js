import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const API_URL = `${SERVER_URL}/api/auth`;

const authService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // Lỗi từ server có phản hồi
        return {
          error: true,
          status: error.response.status,
          message: error.response.data.message,
        };
      } else {
        // Lỗi không có phản hồi (network error, etc)
        return {
          error: true,
          status: 500,
          message: "Không thể kết nối đến máy chủ",
        };
      }
    }
  },
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Lỗi có phản hồi từ server (vd: email đã tồn tại)
        return {
          error: true,
          status: error.response.status,
          message: error.response.data.message || "Đăng ký thất bại",
        };
      } else {
        // Lỗi không có phản hồi (network, timeout, etc.)
        return {
          error: true,
          status: 500,
          message: "Không thể kết nối đến máy chủ",
        };
      }
    }
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
