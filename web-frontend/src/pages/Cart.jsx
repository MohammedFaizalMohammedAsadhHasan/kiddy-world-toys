import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { cartAPI } from '../services/api';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await cartAPI.updateCartItem({ productId, quantity });
      fetchCart();
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      fetchCart();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="py-20 px-4 text-center bg-gradient-to-br from-sky-50 via-pink-50 to-purple-50 min-h-screen">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/20">
            <div className="w-32 h-32 bg-gradient-to-br from-sky-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <ShoppingBag className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added any toys to your cart yet. 🧸</p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                Start Shopping
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 bg-gradient-to-br from-sky-50 via-pink-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8">
          Shopping Cart 🛒
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <motion.div
                key={item.product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20 flex items-center space-x-6"
              >
                <img
                  src={item.product.thumbnail || item.product.images?.[0] || 'https://via.placeholder.com/100'}
                  alt={item.product.name}
                  className="w-32 h-32 object-cover rounded-2xl shadow-lg"
                />
                <div className="flex-1">
                  <Link to={`/product/${item.product._id}`}>
                    <h3 className="font-bold text-gray-800 text-lg hover:text-pink-500 transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <span className="text-pink-500 font-bold text-xl">RS {item.price}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                    className="p-2 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="w-10 text-center font-bold text-xl">{item.quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="p-2 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 text-xl">RS {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeItem(item.product._id)}
                  className="p-3 rounded-full hover:bg-red-100 text-red-500 transition-colors"
                >
                  <Trash2 className="w-6 h-6" />
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 sticky top-24">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">RS {cart.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Shipping</span>
                  <span className="font-semibold">{cart.totalAmount > 100 ? 'Free' : 'RS 10.00'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Tax (10%)</span>
                  <span className="font-semibold">RS {(cart.totalAmount * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    <span>Total</span>
                    <span>RS {(cart.totalAmount + (cart.totalAmount > 100 ? 0 : 10) + cart.totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>

              <Link to="/shop">
                <button className="w-full mt-4 py-3 text-gray-600 hover:text-pink-500 font-semibold transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
