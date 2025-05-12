import apiClient from "../../../config/apiClient";

const API_URL = '/api/customers';

// Helper để validate dữ liệu
const validateCustomerData = data => {
	const errors = {};
	if (!data.name) errors.name = 'Name is required';
	if (!data.email) errors.email = 'Email is required';
	if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
		errors.email = 'Invalid email format';
	}
	return Object.keys(errors).length ? errors : null;
};

const customerService = {

	// GET methods
	getAll: async (params = { page: 1, limit: 10 }) => {
		const response = await apiClient.get(`${API_URL}`, { params });
		console.log(`response`, response.data.data);
		
		return response.data.data;
	},

	getById: async id => {
		const response = await apiClient.get(`${API_URL}/${id}`);
		return response.data.data;
	},

	getViolationHistory: async id => {
		const response = await apiClient.get(`${API_URL}/${id}/history`);
		return response.data.data.statusHistory;
	},

	// POST/PUT/PATCH methods with validation
	create: async customerData => {
		const errors = validateCustomerData(customerData);
		if (errors) throw { validation: errors };

		const response = await apiClient.post(customerData);
		return response.data.data;
	},

	update: async (id, customerData) => {
		const errors = validateCustomerData(customerData);
		if (errors) throw { validation: errors };

		const response = await apiClient.put(`${API_URL}${id}`, customerData);
		return response.data.data;
	},

	updateStatus: async (id, statusData) => {
		if (!statusData.status)
			throw { validation: { status: 'Status is required' } };

		const response = await apiClient.patch(`${API_URL}/${id}/status`, statusData);
		return response.data.data;
	},

	// Cache management
	clearCache: () => {
		// Clear cached data when needed
		localStorage.removeItem('customersCache');
	},
};

export default customerService;
