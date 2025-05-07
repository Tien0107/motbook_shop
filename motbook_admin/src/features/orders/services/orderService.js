// src/features/orders/services/orderService.js
import apiClient from "../../../config/apiClient";


const API_URL = '/api/orders';

export const orderService = {
	getOrders: async () => {
		const response = await apiClient.get(API_URL);
		if (response.status !== 200) {
			throw new Error('Failed to fetch orders');
		}
		return response.data.data;
	},

	getById: async id => {
		const response = await apiClient.get(`${API_URL}/${id}`);
		console.log(`response`, response.data);
		
		if (response.status !== 200) {
			throw new Error('Failed to fetch order');
		}
		return response.data.data;
	},

	updateStatus: async (id, status) => {
		const response = await apiClient.patch(`${API_URL}/${id}/status`, { status });
		if (response.status !== 200) {
			throw new Error('Failed to update order status');
		}
		return response.data.data;
	},

	delete: async id => {
		await apiClient.delete(`${API_URL}/${id}`);
		return id;
	},

	create: async orderData => {
		const response = await apiClient.post(API_URL, orderData);
		if (response.status !== 201) {
			throw new Error('Failed to create order');
		}
		return response.data.data;
	},

	update: async (id, orderData) => {
		const response = await apiClient.put(`${API_URL}/${id}`, orderData);
		if (response.status !== 200) {
			throw new Error('Failed to update order');
		}
		return response.data.data;
	},
};
