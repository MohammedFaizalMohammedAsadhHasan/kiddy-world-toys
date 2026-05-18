import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { wishlistAPI, cartAPI } from '../services/api';

const ProductCard = ({ product }) => {
  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await wishlistAPI.addToWishlist({ productId: product._id });
      toast.success('Added to wishlist!');
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await cartAPI.addToCart({ productId: product._id, quantity: 1 });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      className="glass-card overflow-hidden group"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative">
          <img
            src={product.thumbnail || product.images[0] || 'https://via.placeholder.com/300x300'}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToWishlist}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-pink-100 transition-colors"
            >
              <Heart className="w-4 h-4 text-pink-500" />
            </motion.button>
          </div>
          {product.discountPrice > 0 && (
            <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Sale
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.numReviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {product.discountPrice > 0 ? (
                <>
                    <span className="text-lg font-bold text-pink-500">
                    Rs {product.discountPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through ml-2">
                    Rs {product.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-800">
                  Rs {product.price}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="p-2 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
