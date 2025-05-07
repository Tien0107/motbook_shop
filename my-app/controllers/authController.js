const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseUtils');
const { validateSignupData, validateLoginData } = require('../validators/authValidator');
require('dotenv').config();

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const validationResult = validateSignupData(email, password, name);
    if (!validationResult.isValid) {
      return sendError(res, validationResult.message, 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 'Email đã được sử dụng', 400);
    }

    const user = new User({
      email,
      password,
      name,
      createdAt: new Date()
    });
    await user.save();

    // const token = jwt.sign(
    //   { userId: user._id, email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' }
    // );

    return sendSuccess(
      res,
      { user: { id: user._id, email, name } },
      'Đăng ký thành công',
      201
    );
  } catch (error) {
    return sendError(res, 'Lỗi server');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationResult = validateLoginData(email, password);
    if (!validationResult.isValid) {
      return sendError(res, validationResult.message, 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, 'Tài khoản không tồn tại', 401);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return sendError(res, 'Email hoặc mật khẩu không đúng', 401);
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return sendSuccess(
      res,
      { accessToken, refreshToken, user },
      'Đăng nhập thành công'
    );
  } catch (error) {
    return sendError(res, 'Lỗi server');
  }
};

const logout = (req, res) => {
  return sendSuccess(res, null, 'Đăng xuất thành công');
};

const refreshToken = (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return sendError(res, 'Token không tìm thấy', 401);
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return sendError(res, 'Token không hợp lệ', 403);
      }
      const newToken = jwt.sign(
        { userId: user.userId, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return sendSuccess(res, { accessToken: newToken, refreshToken }, 'Refresh token thành công');
    });
  } catch (error) {
    return sendError(res, 'Lỗi server');
  }
};

module.exports = { signup, login, logout, refreshToken };