// src/features/analytics/stores/analyticsStore.js
import {create} from 'zustand';

const useAnalyticsStore = create(set => ({
	stats: {
		totalSales: 0,
		totalOrders: 0,
		totalCustomers: 0,
		pendingOrders: 0,
		dailyVisitors: 0,
		monthlySales: [],
		topProducts: [],
		recentTransactions: [],
	},
	loading: false,
	error: null,
	setStats: stats => set({ stats }),
	setLoading: loading => set({ loading }),
	setError: error => set({ error }),

	// fetchAnalytics: async () => {
	// 	set({ loading: true });
	// 	try {
	// 		// Simulated API call
	// 		const response = await fetch('/api/analytics/dashboard');
	// 		const data = await response.json();
	// 		set({ stats: data, loading: false });
	// 	} catch (error) {
	// 		set({ error: error.message, loading: false });
	// 	}
	// },
}));

export default useAnalyticsStore;
