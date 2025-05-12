import { Link } from 'react-router-dom';
import useAuthStore from '../../features/auth/stores/authStore';

const Profile = () => {
    const { user, logout } = useAuthStore();
    console.log(user);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-lg p-6">
                {/* User Info Section */}
                <div className="text-center mb-8">
                    <img
                        src={user?.user.avatar.url || '/assets/profile.jpg'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800">{user?.user.name}</h2>
                    <p className="text-gray-600">{user?.user.email}</p>
                </div>

                {/* Quick Links Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Link
                        to="/cart"
                        className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
                    >
                        <div className="ml-4">
                            <h3 className="font-semibold text-blue-700">Giỏ hàng</h3>
                            <p className="text-sm text-blue-600">Xem giỏ hàng của bạn</p>
                        </div>
                    </Link>

                    <Link
                        to="/orders"
                        className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100"
                    >
                        <div className="ml-4">
                            <h3 className="font-semibold text-green-700">Đơn hàng</h3>
                            <p className="text-sm text-green-600">Xem lịch sử đơn hàng</p>
                        </div>
                    </Link>
                </div>

                {/* Account Actions */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tài khoản</h3>

                    <div className="flex flex-col space-y-2">
                        <Link
                            to="/shop"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            Tiếp tục mua sắm
                        </Link>

                        <Link
                            to="/about"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            Về chúng tôi
                        </Link>

                        <Link
                            to="/blog"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            Blog
                        </Link>

                        <button
                            onClick={logout}
                            className="text-red-600 hover:text-red-800 transition-colors text-left"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
