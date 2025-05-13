import { create } from 'zustand';
import cartService from '../services/cartService';
import useAuthStore from '../../auth/stores/authStore';

const { user } = useAuthStore.getState();
const  userId = user?.user?._id;

const useCartStore = create(set => ({
    cartItems: [],
    setCartItems: (items) => set({ cartItems: items }),

    fetchCartItems: async () => {   
        try {
            const response = await cartService.getCartByUserId(userId);
            console.log('Fetched cart items:', response.data.items);

            set({ cartItems: response.data.items });
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    },
    addToCart: (item) => set(state => ({ cartItems: [...state.cartItems, item] })),
    removeFromCart: async (itemId) => {
        try {
            const data = await cartService.removeFromCart(userId, itemId);
            const newCart = data.items;
            console.log('Updated cart after removal:', newCart);    
            console.log('Removed item from cart:', newCart);
            set(state => ({
                cartItems: state.cartItems.filter(item => item._id !== itemId),
            }));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    },
    updateQuantity: async (userId, bookId, quantity) => {
    try {
        await cartService.updateQuantity(userId, bookId, quantity);
    } catch (error) {
        console.error('Lỗi cập nhật số lượng:', error);
    }
},

    clearCart: () => set({ cartItems: [] }),
    getTotalPrice: () => {
        const items = useCartStore.getState().cartItems;
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
}));
export default useCartStore;