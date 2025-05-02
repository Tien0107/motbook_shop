import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
	persist(
		set => ({
			user: null,
			isAuthenticated: false,
			login: userData => set({ user: userData, isAuthenticated: true }),
			logout: () => set({ user: null, isAuthenticated: false }),
			getNewAccessToken: (newAccessToken) => {
				const currentUser = useAuthStore.getState().user;
				if (!currentUser) return;

				set({
					user: {
						...currentUser,
						data: {
							...currentUser.data,
							accessToken: newAccessToken,
						},
					},
					isAuthenticated: true,
				});
			},
		}),
		{
			name: 'auth-storage', // unique name for localStorage key
		},
	),
);

export default useAuthStore;
