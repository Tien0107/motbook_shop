const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserCollection } = require('../models/User');

const signup = async (req, res, client) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ email, mật khẩu và tên' });
    }

    const userCollection = await getUserCollection(client);
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword, name, createdAt: new Date() };
    const result = await userCollection.insertOne(newUser);

    const token = jwt.sign({ userId: result.insertedId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'Đăng ký thành công', token, user: { id: result.insertedId, email, name } });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

const login = async (req, res, client) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu' });
    }

    const userCollection = await getUserCollection(client);
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Đăng nhập thành công', token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: 'Đăng xuất thành công' });
};

module.exports = { signup, login, logout };