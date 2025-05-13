import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/books'; // đổi nếu backend chạy ở domain khác

// Search books by keyword 
export const searchBooks = async (query) => {
  try {
    console.log(`Gửi request tới: ${API_BASE_URL}/search?query=${query}`);
    
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { query }
    });
    
    console.log('Phản hồi thành công:', response.status, response.statusText);
    console.log('Cấu trúc dữ liệu:', response.data);
    
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.books && Array.isArray(response.data.books)) {
      return response.data.books;
    } else if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.warn('Định dạng dữ liệu không như mong đợi:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Chi tiết lỗi tìm kiếm:', error);
    
    if (error.response) {
      // Server trả về response với status code nằm ngoài phạm vi 2xx
      console.error('Thông tin lỗi từ server:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
      throw error.response.data || { message: `Lỗi ${error.response.status}: ${error.response.statusText}` };
    } else if (error.request) {
      // Yêu cầu được gửi nhưng không nhận được phản hồi
      console.error('Không nhận được phản hồi từ server');
      throw { message: 'Không thể kết nối đến máy chủ, vui lòng kiểm tra kết nối mạng' };
    } else {
      // Có lỗi khi thiết lập request
      console.error('Lỗi khi thiết lập request:', error.message);
      throw { message: 'Có lỗi xảy ra khi gửi yêu cầu' };
    }
  }
};

// Get all books or by category
export const getAllBooks = async (category = null) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`, {
      params: category ? { category } : {}
    });
    
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.books && Array.isArray(response.data.books)) {
      return response.data.books;
    } else if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.warn('Định dạng dữ liệu không như mong đợi:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Lỗi khi lấy sách:', error);
    throw error?.response?.data || { message: 'Không thể tải danh sách sách' };
  }
};