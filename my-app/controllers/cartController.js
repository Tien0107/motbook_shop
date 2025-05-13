const Cart = require('../models/Cart.js');
const Book = require('../models/Book.js'); // Để lấy giá sách khi tính tổng tiền
const { sendError, sendSuccess } = require('../utils/responseUtils.js');

// Lấy giỏ hàng của người dùng
const getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.book');
        if (!cart) return sendError(res, 'Giỏ hàng không tồn tại.');
        sendSuccess(res, cart, 'Giỏ hàng đã được lấy thành công.');
    } catch (error) {
        sendError(res, error);
    }
};

// Thêm sách vào giỏ hàng
const addToCart = async (req, res) => {
    const { userId, items } = req.body; // items là mảng [{ bookId, quantity }]
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        for (const { bookId, quantity } of items) {
            const book = await Book.findById(bookId);
            if (!book) return sendError(res, `Sách với ID ${bookId} không tồn tại.`);

            const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ book: book._id, quantity });
            }
        }

        cart.totalPrice = await calculateTotal(cart.items);
        await cart.save();

        sendSuccess(res, cart, 'Các sách đã được thêm vào giỏ hàng.');
    } catch (error) {
        sendError(res, error);
    }
};


// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateQuantity = async (req, res) => {
    const { userId, bookId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) return sendError(res, 'Giỏ hàng không tồn tại.');

        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

        if (itemIndex === -1) {
            return sendError(res, 'Sản phẩm không tồn tại trong giỏ hàng.');
        }

        if (quantity <= 0) {
            // Nếu số lượng là 0 hoặc âm, xóa sản phẩm khỏi giỏ hàng
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        cart.totalPrice = await calculateTotal(cart.items);

        await cart.save();

        sendSuccess(res, cart, 'Cập nhật số lượng sản phẩm thành công!');
    } catch (error) {
        sendError(res, error);
    }
};

// Tính tổng tiền
const calculateTotal = async (items) => {
    let total = 0;
    for (const item of items) {
        const book = await Book.findById(item.book);
        if (book) total += book.price * item.quantity;
    }
    return total;
};

// Xóa sách khỏi giỏ hàng
const removeFromCart = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return sendError(res, 'Giỏ hàng không tồn tại.');

        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.book.toString() !== bookId);

        if (cart.items.length === initialLength) {
            return sendError(res, 'Sách không tồn tại trong giỏ hàng.');
        }

        cart.totalPrice = cart.items.length > 0 ? await calculateTotal(cart.items) : 0;

        await cart.save();

        sendSuccess(res, cart, 'Sách đã được xóa khỏi giỏ hàng.');
    } catch (error) {
        sendError(res, error);
    }
};

// Xóa toàn bộ giỏ hàng
const clearCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return sendError(res, 'Giỏ hàng không tồn tại.');

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        sendSuccess(res, cart, 'Giỏ hàng đã được xóa.');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getCartByUserId,
    addToCart,
    updateQuantity, // Thêm API updateQuantity
    removeFromCart,
    clearCart
};
