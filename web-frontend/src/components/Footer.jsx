import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Kiddy World</h3>
            <p className="text-white/80">
              Bringing joy to children with the best toys and games since 2024.
            </p>
            <div className="flex space-x-4 mt-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Soft Toys</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Educational Toys</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">RC Cars</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Dolls</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Puzzle Games</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span className="text-white/80">info@kiddyworld.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span className="text-white/80">+1 234 567 890</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1" />
                <span className="text-white/80">123 Toy Street, Fun City, FC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/80">
            © 2024 Kiddy World Toys. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
