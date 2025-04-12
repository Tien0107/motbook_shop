import { create } from 'zustand';

const useAuthStore = create(set => ({
	user: null,
	loading: false,
	error: null,
	setUser: user => set({ user }),
	setLoading: loading => set({ loading }),
	setError: error => set({ error }),
	clearError: () => set({ error: null }),
	logout: () => {
		localStorage.removeItem('user');
		set({ user: null });
	},
}));

export default useAuthStore;
