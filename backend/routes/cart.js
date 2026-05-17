const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getCart).post(protect, addToCart);
router.route('/item').put(protect, updateCartItem);
router.route('/:productId').delete(protect, removeFromCart);
router.route('/clear').delete(protect, clearCart);

module.exports = router;
