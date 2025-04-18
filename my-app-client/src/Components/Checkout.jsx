import React from 'react';
import useAuth from '../hooks/useAuth';

const Checkout = () => {
    const { user } = useAuth();
    const [formData, setFormData] = React.useState({
        fullName: user?.displayName || '',
        address: '',
        phone: '',
        paymentMethod: 'cod'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle checkout logic here
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold mb-8">Thanh toán</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Họ tên
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Địa chỉ giao hàng
                    </label>
                    <textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Phương thức thanh toán
                    </label>
                    <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="cod"
                                name="paymentMethod"
                                value="cod"
                                checked={formData.paymentMethod === 'cod'}
                                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="cod" className="ml-2 block text-sm text-gray-700">
                                Thanh toán khi nhận hàng (COD)
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="banking"
                                name="paymentMethod"
                                value="banking"
                                checked={formData.paymentMethod === 'banking'}
                                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="banking" className="ml-2 block text-sm text-gray-700">
                                Chuyển khoản ngân hàng
                            </label>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Xác nhận đặt hàng
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;