const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseUtils');

const getAllUsers = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_users')) {
			return sendError(res, 'Permission denied', 403);
		}
		const users = await User.find().select('-password');
		return sendSuccess(res, users, 'Lấy danh sách người dùng thành công');
	} catch (error) {
		return sendError(res, 'Lỗi khi lấy danh sách người dùng');
	}
};

const getAllCustomers = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_users')) {
			return sendError(res, 'Permission denied', 403);
		}
		const customers = await User.findActiveCustomers();
		return sendSuccess(res, customers, 'Lấy danh sách khách hàng thành công');
	} catch (error) {
		return sendError(res, 'Lỗi khi lấy danh sách khách hàng');
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		if (!user) {
			return sendError(res, 'Không tìm thấy người dùng', 404);
		}

		if (user.role === 'admin') {
			return sendError(res, 'Không thể xóa tài khoản admin', 403);
		}

		await User.findByIdAndDelete(id);
		return sendSuccess(res, null, 'Xóa người dùng thành công');
	} catch (error) {
		return sendError(res, 'Lỗi khi xóa người dùng');
	}
};

const updateUserRole = async (req, res) => {
	try {
		const { id } = req.params;
		const { role } = req.body;

		if (!['user', 'admin'].includes(role)) {
			return sendError(res, 'Role không hợp lệ', 400);
		}

		const user = await User.findById(id);
		if (!user) {
			return sendError(res, 'Không tìm thấy người dùng', 404);
		}

		if (user.role === 'admin' && req.user._id !== id) {
			return sendError(res, 'Không thể thay đổi quyền của admin khác', 403);
		}

		user.role = role;
		await user.save();

		return sendSuccess(res, { role }, 'Cập nhật quyền thành công');
	} catch (error) {
		return sendError(res, 'Lỗi khi cập nhật quyền người dùng');
	}
};

const updateUserStatus = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_users')) {
			return sendError(res, 'Permission denied', 403);
		}
		const { id } = req.params;
		const { status } = req.body;

		const user = await User.findById(id);
		if (!user) {
			return sendError(res, 'Không tìm thấy người dùng', 404);
		}

		if (user.isAdmin()) {
			return sendError(res, 'Không thể thay đổi trạng thái của admin', 403);
		}

		user.status = status;
		await user.save();

		return sendSuccess(res, { status }, 'Cập nhật trạng thái thành công');
	} catch (error) {
		return sendError(res, 'Lỗi khi cập nhật trạng thái người dùng');
	}
};

const getAllUserPermissions = async (req, res) => {
	try {
		if (!req.user.hasPermission('manage_users')) {
			return sendError(res, 'Permission denied', 403);
		}
		const permissions = await User.getPermissions();
		return sendSuccess(res, permissions, 'Lấy danh sách quyền người dùng');
	} catch (error) {
		return sendError(res, 'Lỗi khi lấy danh sách quyền người dùng');
	}
};

const updateUserPermissions = async (req, res) => {
	try {
		if (!req.user.isAdmin()) {
			return sendError(res, 'Only super admin can modify permissions', 403);
		}

		const { id } = req.params;
		const { permissions } = req.body;

		const user = await User.findById(id);
		if (!user) {
			return sendError(res, 'Không tìm thấy người dùng', 404);
		}

		user.permissions = permissions;
		await user.save();

		return sendSuccess(res, { permissions }, 'Cập nhật quyền thành công');
	} catch (error) {
		return sendError(res, 'Lỗi khi cập nhật quyền người dùng');
	}
};

module.exports = {
	getAllUsers,
	getAllCustomers,
	deleteUser,
	updateUserRole,
	updateUserStatus,
	getAllUserPermissions,
	updateUserPermissions,
};
