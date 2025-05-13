const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email là bắt buộc'],
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email không hợp lệ']
  },
  password: {
    type: String,
    required: [true, 'Mật khẩu là bắt buộc'],
    minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự']
  },
  name: {
    type: String,
    required: [true, 'Tên là bắt buộc']
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  avatar: {
    url: {
      type: String,
      default: 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png'
    },
    public_id: {
      type: String,
      default: ''
    },
  },
  // Customer specific fields
  status: {
    type: String,
    enum: ['active', 'suspended', 'banned', 'inactive'],
    default: 'active'
  },
  
  orders: [mongoose.Schema.Types.ObjectId],
  orderCount: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  violations: [{
    type: String,
    date: Date,
    action: String,
    reason: String
  }],
  // Admin specific fields
  permissions: [{
    type: String,
    enum: ['manage_users', 'manage_orders', 'manage_books', 'view_analytics']
  }],
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt field
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Instance methods
userSchema.methods.isAdmin = function () {
  return this.role === 'admin';
};

userSchema.methods.hasPermission = function (permission) {
  return this.permissions?.includes(permission);
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static methods
userSchema.statics.findActiveCustomers = function () {
  return this.find({ role: 'customer', status: 'active' });
};

userSchema.statics.findAdmins = function () {
  return this.find({ role: 'admin' });
};
const User = mongoose.model('User', userSchema);
module.exports = User;
