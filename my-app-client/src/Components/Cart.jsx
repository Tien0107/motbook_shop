import { useEffect } from 'react';
import useAuthStore from '../features/auth/stores/authStore';
import useCartStore from '../features/cart/stores/cartStore';

const Cart = () => {
    const { user } = useAuthStore();
    const {
        cartItems,
        setCartItems,
        fetchCartItems,
        removeFromCart,
        updateQuantity
    } = useCartStore();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleRemoveItem = async (bookId) => {
        await removeFromCart(bookId);
        setCartItems(cartItems.filter(item => item.book._id !== bookId));
    };

    const handleQuantityChange = async (bookId, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity < 1) return;
        await updateQuantity(user.user._id, bookId, newQuantity);
        fetchCartItems();
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <br />
            <br />
            <h2 className="text-3xl font-bold mb-8">Giỏ hàng của {user?.user.name}</h2>
            {cartItems.length === 0 ? (
                <p>Giỏ hàng trống</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center space-x-4">
                                <img src={item.book.images[0].url} alt={item.book.title} className="w-24 h-32 object-cover" />
                                <div>
                                    <h3 className="font-semibold">{item.book.title}</h3>
                                    <p className="text-gray-600">{item.book.price} VND</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.book._id, item.quantity, -1)}
                                            className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                                        >-</button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.book._id, item.quantity, +1)}
                                            className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveItem(item.book._id)}
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-end space-x-4 pt-4">
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
