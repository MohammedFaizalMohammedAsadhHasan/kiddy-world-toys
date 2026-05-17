import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { productsAPI, categoriesAPI } from '../services/api';
import { Sparkles, TrendingUp, Gift } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [featuredRes, trendingRes, newArrivalsRes, categoriesRes] = await Promise.all([
        productsAPI.getFeatured(),
        productsAPI.getTrending(),
        productsAPI.getNewArrivals(),
        categoriesAPI.getCategories(),
      ]);

      setFeaturedProducts(featuredRes.data.products);
      setTrendingProducts(trendingRes.data.products);
      setNewArrivals(newArrivalsRes.data.products);
      setCategories(categoriesRes.data.categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title, subtitle }) => (
    <div className="flex items-center space-x-3 mb-8">
      <div className="p-3 bg-gradient-to-r from-sky-400 to-pink-400 rounded-xl">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <Hero />

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={Sparkles}
            title="Shop by Category"
            subtitle="Find the perfect toy for every age and interest"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={Gift}
            title="Featured Products"
            subtitle="Hand-picked favorites loved by kids and parents"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={TrendingUp}
            title="Trending Now"
            subtitle="The hottest toys everyone is talking about"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={Sparkles}
            title="New Arrivals"
            subtitle="Fresh additions to our toy collection"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 p-12 text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-4">Special Offer!</h2>
            <p className="text-xl mb-6">Get 20% off on all educational toys this week</p>
            <button className="bg-white text-pink-500 font-semibold py-3 px-8 rounded-full hover:bg-pink-100 transition-colors">
              Shop Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
