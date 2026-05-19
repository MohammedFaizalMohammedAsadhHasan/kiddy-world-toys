import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { productsAPI, cartAPI, wishlistAPI, reviewsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getProduct(id);
      setProduct(response.data.product);
      setSelectedImage(0);
      
      // Fetch related products
      const relatedRes = await productsAPI.getProducts({ category: response.data.product.category._id });
      setRelatedProducts(relatedRes.data.products.filter(p => p._id !== id).slice(0, 4));

      // Fetch reviews
      const reviewsRes = await reviewsAPI.getReviews(id);
      setReviews(reviewsRes.data.reviews);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await cartAPI.addToCart({ productId: id, quantity });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await wishlistAPI.addToWishlist({ productId: id });
      toast.success('Added to wishlist!');
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="py-8 px-4 bg-gradient-to-br from-sky-50 via-pink-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm">
          <nav className="flex items-center space-x-2">
            <Link to="/" className="text-pink-500 hover:text-pink-600 font-medium">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/shop" className="text-pink-500 hover:text-pink-600 font-medium">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20 mb-6"
            >
              <img
                src={product.images[selectedImage] || product.thumbnail || 'https://via.placeholder.com/600x600'}
                alt={product.name}
                className="w-full h-[500px] object-contain rounded-2xl"
              />
            </motion.div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`p-2 rounded-2xl border-2 transition-all overflow-hidden ${
                      selectedImage === index 
                        ? 'border-pink-500 shadow-lg shadow-pink-500/30' 
                        : 'border-transparent hover:border-pink-300'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index}`} className="w-full h-20 object-cover rounded-xl" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-4 py-1 bg-gradient-to-r from-sky-500 to-pink-500 text-white text-sm font-semibold rounded-full mb-3">
                {product.category?.name || 'Toys'}
              </span>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 font-medium">({product.numReviews} reviews)</span>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-sky-100 via-pink-100 to-purple-100 rounded-2xl">
              {product.discountPrice > 0 ? (
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    RS{product.discountPrice}
                  </span>
                  <span className="text-2xl text-gray-400 line-through">RS{product.price}</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-bold shadow-lg">
                    Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  RS{product.price}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>

            <div className="flex items-center space-x-6 p-4 bg-white/50 backdrop-blur rounded-2xl">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Minus className="w-5 h-5" />
                </motion.button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>
              <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToWishlist}
                className="p-4 rounded-2xl border-2 border-pink-500 text-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white transition-all shadow-lg"
              >
                <Heart className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white/50 backdrop-blur rounded-2xl">
                <div className="p-3 bg-gradient-to-br from-sky-400 to-sky-500 rounded-xl">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 backdrop-blur rounded-2xl">
                <div className="p-3 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-700 font-medium">100% Authentic</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 backdrop-blur rounded-2xl">
                <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl">
                  <RotateCcw className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Easy Returns</span>
              </div>
            </div>

            {/* Age Group */}
            <div className="p-6 bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 rounded-2xl text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">Recommended Age</p>
                  <p className="text-3xl font-bold">{product.ageGroup}+ years</p>
                </div>
                <div className="text-6xl">🎮</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8">
            Customer Reviews
          </h2>
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-white/50 backdrop-blur rounded-3xl">
              <p className="text-gray-500 text-lg">No reviews yet. Be the first to review! ⭐</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {review.user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{review.user.name}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">{review.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
