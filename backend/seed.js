const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Import models
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

// Sample data
const categories = [
  {
    name: 'Soft Toys',
    description: 'Cuddly and soft toys for kids',
    emoji: '🧸',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  },
  {
    name: 'Educational Toys',
    description: 'Learn while playing with educational toys',
    emoji: '📚',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
  },
  {
    name: 'RC Cars',
    description: 'Remote control cars for racing fun',
    emoji: '🚗',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400',
  },
  {
    name: 'Dolls',
    description: 'Beautiful dolls for imaginative play',
    emoji: '🎎',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  },
  {
    name: 'Puzzle Games',
    description: 'Brain-teasing puzzles for all ages',
    emoji: '🧩',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400',
  },
  {
    name: 'Building Blocks',
    description: 'Build anything with creative blocks',
    emoji: '🧱',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400',
  },
  {
    name: 'Outdoor Toys',
    description: 'Fun toys for outdoor adventures',
    emoji: '⚽',
    image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400',
  },
  {
    name: 'Baby Toys',
    description: 'Safe and engaging toys for babies',
    emoji: '👶',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  },
];

const products = [
  {
    name: 'Cute Teddy Bear',
    description: 'A soft and cuddly teddy bear perfect for hugs',
    price: 29.99,
    category: 'Soft Toys',
    stock: 50,
    ageGroup: '3-5',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    ],
    rating: 4.5,
    numReviews: 120,
    featured: true,
    trending: true,
  },
  {
    name: 'RC Racing Car',
    description: 'High-speed remote control racing car with LED lights',
    price: 49.99,
    discountPrice: 39.99,
    category: 'RC Cars',
    stock: 30,
    ageGroup: '6-8',
    images: [
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400',
    ],
    rating: 4.8,
    numReviews: 85,
    featured: true,
    trending: true,
  },
  {
    name: 'Building Blocks Set',
    description: '500-piece colorful building blocks for creative construction',
    price: 34.99,
    category: 'Building Blocks',
    stock: 45,
    ageGroup: '3-5',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400',
    ],
    rating: 4.7,
    numReviews: 200,
    featured: true,
  },
  {
    name: 'Princess Doll',
    description: 'Beautiful princess doll with accessories',
    price: 24.99,
    category: 'Dolls',
    stock: 60,
    ageGroup: '3-5',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    ],
    rating: 4.6,
    numReviews: 95,
    trending: true,
  },
  {
    name: 'Wooden Puzzle',
    description: 'Educational wooden puzzle for cognitive development',
    price: 19.99,
    category: 'Puzzle Games',
    stock: 40,
    ageGroup: '0-2',
    images: [
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400',
    ],
    rating: 4.4,
    numReviews: 78,
  },
  {
    name: 'Soccer Ball',
    description: 'Professional soccer ball for outdoor play',
    price: 22.99,
    category: 'Outdoor Toys',
    stock: 55,
    ageGroup: '6-8',
    images: [
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400',
    ],
    rating: 4.5,
    numReviews: 110,
    trending: true,
  },
  {
    name: 'Baby Rattle Set',
    description: 'Colorful rattle set for sensory development',
    price: 14.99,
    category: 'Baby Toys',
    stock: 70,
    ageGroup: '0-2',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    ],
    rating: 4.3,
    numReviews: 65,
  },
  {
    name: 'Science Kit',
    description: 'Educational science kit for young scientists',
    price: 44.99,
    category: 'Educational Toys',
    stock: 25,
    ageGroup: '9-12',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    ],
    rating: 4.9,
    numReviews: 150,
    featured: true,
    newArrival: true,
  },
  {
    name: 'Robot Toy',
    description: 'Interactive robot toy with voice commands',
    price: 59.99,
    category: 'Educational Toys',
    stock: 35,
    ageGroup: '6-8',
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
    ],
    rating: 4.7,
    numReviews: 90,
    trending: true,
    newArrival: true,
  },
  {
    name: 'Art Supplies Kit',
    description: 'Complete art supplies kit for creative kids',
    price: 27.99,
    category: 'Educational Toys',
    stock: 50,
    ageGroup: '6-8',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
    ],
    rating: 4.6,
    numReviews: 125,
    newArrival: true,
  },
  {
    name: 'Drone for Kids',
    description: 'Easy-to-fly drone with camera',
    price: 79.99,
    discountPrice: 69.99,
    category: 'RC Cars',
    stock: 20,
    ageGroup: '12+',
    images: [
      'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400',
    ],
    rating: 4.8,
    numReviews: 45,
    featured: true,
    newArrival: true,
  },
  {
    name: 'Musical Keyboard',
    description: 'Colorful musical keyboard for young musicians',
    price: 32.99,
    category: 'Educational Toys',
    stock: 40,
    ageGroup: '3-5',
    images: [
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400',
    ],
    rating: 4.4,
    numReviews: 80,
  },
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@kiddyworld.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
  },
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    console.log('Cleared existing data');

    // Seed categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Create category map
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Seed products with category references
    const productsWithCategories = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`Created ${createdProducts.length} products`);

    // Seed users
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`Created ${createdUsers.length} users`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
