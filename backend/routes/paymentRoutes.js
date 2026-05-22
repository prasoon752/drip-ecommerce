const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Temporary routes until Razorpay is configured
router.post('/create-order', protect, (req, res) => {
  res.json({ success: true, message: 'Payment route working' });
});

router.post('/verify', protect, (req, res) => {
  res.json({ success: true, message: 'Payment verified' });
});

module.exports = router;
