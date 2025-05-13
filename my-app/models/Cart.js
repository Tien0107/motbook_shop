const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, required: true },
    items: {
        type: [
            {
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Book',
                    required: true
                },
                quantity: {
                    type: Number, required: true,
                    min: [1, 'Số lượng phải lớn hơn 0']
                },
            },
        ],
        default: []
    },
    totalPrice: { type: Number, default: 0 },
});




const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;