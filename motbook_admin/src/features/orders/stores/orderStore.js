// src/features/orders/stores/orderStore.js
import { create } from 'zustand';
import { orderService } from '../services/orderService';

const useOrderStore = create((set) => ({
	orders: [],
	selectedOrder: null,
	loading: false,
	error: null,
	filters: {
		search: '',
		status: 'all',
		dateRange: [null, null],
		sortBy: 'date-desc'
	},

	// Actions
	setLoading: (loading) => set({ loading }),
	setError: (error) => set({ error }),
	setOrders: (orders) => set({ orders }),
	setSelectedOrder: (order) => set({ selectedOrder: order }),
	setFilters: (filters) => set({ filters }),

	// Async actions
	fetchOrders: async () => {
		set({ loading: true, error: null });
		try {
			const orders = await orderService.getOrders();
			set({ orders, loading: false });
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	getOrderById: async (id) => {
		set({ loading: true, error: null });
		try {
			const order = await orderService.getById(id);
			set({ selectedOrder: order, loading: false });
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	updateOrderStatus: async (id, status) => {
		set({ loading: true, error: null });
		try {
			const updatedOrder = await orderService.updateStatus(id, status);
			set((state) => ({
				orders: state.orders.map((order) =>
					order._id === id ? { ...order, status } : order
				),
				selectedOrder: state.selectedOrder?.id === id ? { ...state.selectedOrder, status } : state.selectedOrder,
				loading: false,
			}));
			set((state) => ({
				orders: state.orders.map((order) =>
					order._id === id ? updatedOrder : order
				),
				selectedOrder: state.selectedOrder?._id === id ? updatedOrder : state.selectedOrder,
				loading: false,
			}));
		} catch (error) {
			set({ error: error.message, loading: false });
		}
	},

	// Computed values
	filteredOrders: (state) => {
		let filtered = [...state.orders];

		// Apply search filter
		if (state.filters.search) {
			const searchTerm = state.filters.search.toLowerCase();
			filtered = filtered.filter(
				(order) =>
					order.user.name.toLowerCase().includes(searchTerm) ||
					order._id.toString().includes(searchTerm)
			);
		}

		// Apply status filter
		if (state.filters.status !== 'all') {
			filtered = filtered.filter(
				(order) => order.status === state.filters.status
			);
		}

		// Apply date range filter
		if (state.filters.dateRange[0] && state.filters.dateRange[1]) {
			filtered = filtered.filter(
				(order) =>
					new Date(order.date) >= state.filters.dateRange[0] &&
					new Date(order.date) <= state.filters.dateRange[1]
			);
		}

		// Apply sorting
		const [field, order] = state.filters.sortBy.split('-');
		filtered.sort((a, b) => {
			if (order === 'asc') {
				return a[field] > b[field] ? 1 : -1;
			} else {
				return a[field] < b[field] ? 1 : -1;
			}
		});

		return filtered;
	},
}));

export default useOrderStore;
