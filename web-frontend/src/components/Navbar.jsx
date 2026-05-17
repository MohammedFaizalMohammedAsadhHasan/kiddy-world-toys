import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, User, Search, Menu, X, ToyBrick } from 'lucide-react';
import { cartAPI } from '../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await cartAPI.getCart();
        setCartCount(response.data.cart.items.length);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <ToyBrick className="w-8 h-8 text-pink-500" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Kiddy World
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Shop
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Categories
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-pink-100 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </motion.button>
            
            <Link to="/wishlist">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-pink-100 transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-700" />
              </motion.button>
            </Link>

            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-pink-100 transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full hover:bg-pink-100 transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-700" />
                  </motion.button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="gradient-btn text-sm"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-pink-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-t"
        >
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Home
            </Link>
            <Link to="/shop" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Shop
            </Link>
            <Link to="/wishlist" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Wishlist
            </Link>
            <Link to="/cart" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
              Cart
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-gray-700 hover:text-pink-500 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block text-gray-700 hover:text-pink-500 transition-colors font-medium">
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
