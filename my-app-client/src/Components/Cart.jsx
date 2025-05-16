import { useState } from 'react';
import useAuthStore from '../features/auth/stores/authStore';
const Cart = () => {
    const { user } = useAuthStore();
    const [cartItems, setCartItems] = useState([]);

    const handleRemoveItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold mb-8">Giỏ hàng của {user?.user.name}</h2>
            {cartItems.length === 0 ? (
                <p>Giỏ hàng trống</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.title} className="w-24 h-32 object-cover" />
                                <div>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-gray-600">{item.price} VND</p>
                                </div>
                            </div>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveItem(item.id)}
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-end space-x-4">
                        <p className="font-bold">Tổng cộng: {calculateTotal()} VND</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => window.location.href = '/checkout'}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;