import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">New Collection 2024</span>
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Discover Magic
              </span>
              <br />
              <span className="text-gray-800">in Every Toy</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Explore our amazing collection of toys that spark imagination and bring endless joy to children of all ages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="gradient-btn flex items-center justify-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="gradient-btn-secondary flex items-center justify-center space-x-2"
                >
                  <span>View Categories</span>
                </motion.button>
              </Link>
            </div>

            <div className="flex items-center space-x-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">10K+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">50K+</div>
                <div className="text-sm text-gray-500">Happy Kids</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">4.9</div>
                <div className="flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-500 ml-1">Rating</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card p-8 rounded-3xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=500&fit=crop"
                  alt="Happy Kids with Toys"
                  className="rounded-2xl w-full h-auto object-cover"
                />
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full opacity-50 blur-xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-yellow-400 rounded-full opacity-50 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
