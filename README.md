# Kiddy World Toys - E-Commerce Application

A modern, full-stack e-commerce web and mobile application for kids' toys with a beautiful, colorful, and kid-friendly UI/UX design.

## 🎨 Features

### User Features
- **Authentication**: User registration, login, and JWT-based authentication
- **Product Browsing**: Browse toys by categories, search, and filter by price, ratings, and age group
- **Product Details**: View detailed product information, images, ratings, and reviews
- **Shopping Cart**: Add items to cart, update quantities, and manage cart
- **Wishlist**: Save favorite products for later
- **Checkout**: Complete orders with shipping address and payment method selection
- **Order Tracking**: View order history and track delivery status
- **User Profile**: Manage personal information and account settings

### Admin Features
- **Dashboard**: View sales analytics, total users, products, and orders
- **Product Management**: Add, edit, and delete products
- **Category Management**: Manage product categories
- **Order Management**: View and update order statuses
- **User Management**: View all registered users

### Mobile App Features
- **Cross-platform**: React Native Expo for iOS and Android
- **Bottom Navigation**: Easy navigation between Home, Shop, Cart, Wishlist, and Profile
- **Smooth Animations**: Fluid transitions and interactions
- **Push Notifications**: Order updates and promotions
- **Responsive Design**: Optimized for mobile screens

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Stripe** - Payment integration
- **Nodemailer** - Email notifications

### Web Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Routing

### Mobile App
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation
- **Expo Secure Store** - Secure storage
- **Axios** - HTTP client
- **Linear Gradient** - Gradients

## 📁 Project Structure

```
kids-toys-project/
│
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── reviewController.js
│   │   ├── wishlistController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   └── errorHandler.js    # Error handling
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   └── Wishlist.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── reviews.js
│   │   ├── wishlist.js
│   │   ├── admin.js
│   │   └── users.js
│   ├── .env.example
│   ├── package.json
│   ├── seed.js                # Database seed script
│   └── server.js
│
├── web-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── mobile-app/
    ├── src/
    │   ├── screens/
    │   │   ├── SplashScreen.js
    │   │   ├── LoginScreen.js
    │   │   ├── RegisterScreen.js
    │   │   ├── HomeScreen.js
    │   │   ├── ShopScreen.js
    │   │   ├── ProductDetailsScreen.js
    │   │   ├── CartScreen.js
    │   │   ├── WishlistScreen.js
    │   │   ├── ProfileScreen.js
    │   │   ├── CheckoutScreen.js
    │   │   └── OrdersScreen.js
    │   ├── navigation/
    │   │   └── AppNavigator.js
    │   ├── contexts/
    │   │   └── AuthContext.js
    │   └── services/
    │       └── api.js
    ├── App.js
    ├── app.json
    ├── babel.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/kiddy-world-toys
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
```

5. Seed the database with sample data:
```bash
node seed.js
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Web Frontend Setup

1. Navigate to the web-frontend directory:
```bash
cd web-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The web frontend will run on `http://localhost:5173`

### Mobile App Setup

1. Navigate to the mobile-app directory:
```bash
cd mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://YOUR_LOCAL_IP:5000/api';
```

4. Start the Expo development server:
```bash
npm start
```

5. Run on iOS simulator:
```bash
npm run ios
```

6. Run on Android emulator:
```bash
npm run android
```

7. Or scan the QR code with Expo Go app on your phone

## 📱 Default Users

### Admin User
- Email: `admin@kiddyworld.com`
- Password: `admin123`

### Regular User
- Email: `john@example.com`
- Password: `user123`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/trending` - Get trending products
- `GET /api/products/new-arrivals` - Get new arrivals
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/admin/orders/:id` - Update order status (Admin)

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `DELETE /api/reviews/:id` - Delete review

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders

## 🎨 UI Design

The application features:
- **Colorful Gradients**: Soft pink, orange, and yellow gradients
- **Glassmorphism**: Modern glass-like UI elements
- **Smooth Animations**: Framer Motion for web, React Native Reanimated for mobile
- **Rounded Components**: Soft corners and playful shapes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Kid-Friendly Icons**: Toy-themed emojis and icons

## 📦 Deployment

### Backend Deployment (e.g., Render, Heroku)
1. Set up MongoDB Atlas for production database
2. Update environment variables in production
3. Deploy backend code
4. Ensure CORS is configured for your frontend domain

### Web Frontend Deployment (e.g., Vercel, Netlify)
1. Update API base URL to production backend
2. Build the application: `npm run build`
3. Deploy the dist folder

### Mobile App Deployment
1. Build for iOS: `eas build --platform ios`
2. Build for Android: `eas build --platform android`
3. Submit to App Store and Google Play Store

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created with ❤️ for Kiddy World Toys

## 📞 Support

For support, please contact support@kiddyworld.com
