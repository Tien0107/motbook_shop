import apiClient from '../../../config/apiClient';
const CART_API_URL = '/api/cart';


const cartService = {

    async getCartByUserId(userId) {
        try {
            const response = await apiClient.get(`${CART_API_URL}/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },

 async addToCart(userId, items) {
    try {
        const response = await apiClient.post(`${CART_API_URL}/add`, { userId, items });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
},


    async removeFromCart(userId, bookId) {
        try {
            const response = await apiClient.delete(`${CART_API_URL}/remove`, { data: { userId, bookId } });
            return response.data;
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    },
    async updateQuantity(userId, bookId, quantity) {
    try {
        const response = await apiClient.put(`/api/cart/update-quantity`, {
            userId,
            bookId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error updating quantity:', error);
        throw error;
    }
},


    async clearCart(userId) {
        try {
            const response = await apiClient.delete(`${CART_API_URL}/clear/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    },
};

export default cartService;