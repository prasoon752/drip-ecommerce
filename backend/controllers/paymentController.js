const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @POST /api/payment/create-order
const createOrder = async (req, res) => {
  try {
    const { amount, cartItems, address } = req.body;

    // amount should be in paise (₹1 = 100 paise)
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `drip_${Date.now()}`
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save pending order in DB
    const order = await Order.create({
      user: req.user._id,
      items: cartItems,
      totalAmount: amount,
      orderId: razorpayOrder.id,
      status: 'pending',
      address
    });

    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order._id
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @POST /api/payment/verify
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Verify signature (webhook verification)
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    // Update order status to paid
    await Order.findByIdAndUpdate(orderId, {
      status: 'paid',
      paymentId: razorpay_payment_id
    });

    res.json({ success: true, message: 'Payment verified! Order placed successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder, verifyPayment };
