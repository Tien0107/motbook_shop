import apiClient from "../../../config/apiClient";

const API_URL = '/api/books';

const productService = {
	async getProducts() {
		// Implement get all products logic here
		const response = await apiClient.get(`${API_URL}/all`);
		console.log(`response`, response.data.data);
		
		return response.data.data;
	},

	async getProduct(id) {
		// Implement get single product logic here
		const response = await apiClient.get(`${API_URL}/${id}`);
		return response.data.data;
	},

	async createProduct(productData) {
		// Implement create product logic here
		const response = await apiClient.post('/api/admin/books', productData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data.data;
	},

	async updateProduct(id, productData) {
		// Implement update product logic here
		await apiClient.put(`${API_URL}/${id}`, productData);
		return true;
	},

	async deleteProduct(id) {
		// Implement delete product logic here
		await apiClient.delete(`${API_URL}/${id}`);
		return true;
	},
};

export default productService;
