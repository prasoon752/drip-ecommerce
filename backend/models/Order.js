const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: Number,
      brand: String,
      name: String,
      price: Number,
      size: String,
      qty: Number,
      emoji: String
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentId: { type: String }, // Razorpay payment ID
  orderId: { type: String },   // Razorpay order ID
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
