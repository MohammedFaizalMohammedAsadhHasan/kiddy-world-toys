import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { wishlistAPI, cartAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await wishlistAPI.getWishlist();
      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      fetchWishlist();
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const addToCart = async (productId) => {
    try {
      await cartAPI.addToCart({ productId, quantity: 1 });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!wishlist || wishlist.products.length === 0) {
    return (
      <div className="py-20 px-4 text-center">
        <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8">Save your favorite toys for later!</p>
        <Link to="/shop">
          <button className="gradient-btn">Start Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card overflow-hidden rounded-xl"
            >
              <div className="relative">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.thumbnail || product.images[0] || 'https://via.placeholder.com/300x300'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-pink-500 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-pink-500">${product.price}</span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="p-2 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full hover:shadow-lg transition-all"
                  >
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
