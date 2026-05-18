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
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-pink-500">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-4 rounded-2xl mb-4"
            >
              <img
                src={product.images[selectedImage] || product.thumbnail || 'https://via.placeholder.com/600x600'}
                alt={product.name}
                className="w-full h-96 object-contain rounded-xl"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`p-2 rounded-xl border-2 transition-all ${
                      selectedImage === index ? 'border-pink-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index}`} className="w-full h-20 object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 ml-2">({product.numReviews} reviews)</span>
            </div>

            <div className="mb-6">
              {product.discountPrice > 0 ? (
                <>
                  <span className="text-3xl font-bold text-pink-500">RS{product.discountPrice}</span>
                  <span className="text-xl text-gray-400 line-through ml-3">RS{product.price}</span>
                  <span className="ml-3 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-800">RS{product.price}</span>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <span className="text-gray-500">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="flex space-x-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 gradient-btn flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToWishlist}
                className="p-3 rounded-full border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Truck className="w-5 h-5 text-sky-500" />
                <span>Free shipping on orders over RS100</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Shield className="w-5 h-5 text-pink-500" />
                <span>100% authentic products</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <RotateCcw className="w-5 h-5 text-purple-500" />
                <span>30-day easy returns</span>
              </div>
            </div>

            {/* Age Group */}
            <div className="mt-6 p-4 bg-gradient-to-r from-sky-100 to-pink-100 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Recommended Age:</span>
              <span className="ml-2 text-lg font-bold text-gray-800">{product.ageGroup} years</span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                        {review.user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{review.user.name}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
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
