const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getTrendingProducts,
  getNewArrivals,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getProducts).post(protect, authorize('admin'), createProduct);
router.route('/featured').get(getFeaturedProducts);
router.route('/trending').get(getTrendingProducts);
router.route('/new-arrivals').get(getNewArrivals);
router.route('/:id').get(getProduct).put(protect, authorize('admin'), updateProduct).delete(protect, authorize('admin'), deleteProduct);

module.exports = router;
