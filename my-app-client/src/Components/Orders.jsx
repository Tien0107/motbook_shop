import { useState } from 'react';
import useAuthStore from '../features/auth/stores/authStore';

const Orders = () => {
    const { user } = useAuthStore();
    const [orders, setOrders] = useState([]);

    const handleRemoveOrder = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId));
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold mb-8">Đơn hàng của {user?.displayName}</h2>
            {orders.length === 0 ? (
                <p>Chưa có đơn hàng nào</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold">Đơn hàng #{order.id}</h3>
                                <span className={`px-3 py-1 rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                        <span>{item.title}</span>
                                        <span>{item.price} VND</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <div className="flex justify-between">
                                    <span className="font-bold">Tổng cộng:</span>
                                    <span className="font-bold">{order.total} VND</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Đặt hàng ngày: {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;