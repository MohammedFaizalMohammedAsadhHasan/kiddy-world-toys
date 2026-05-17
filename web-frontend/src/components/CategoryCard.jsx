import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
    >
      <Link to={`/shop?category=${category._id}`}>
        <div className="relative h-48">
          <img
            src={category.image || 'https://via.placeholder.com/300x200'}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
            <p className="text-sm text-white/80">{category.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
