# Deployment Guide - Kiddy World Toys

This guide provides detailed instructions for deploying the Kiddy World Toys e-commerce application to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Web Frontend Deployment](#web-frontend-deployment)
4. [Mobile App Deployment](#mobile-app-deployment)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment Steps](#post-deployment-steps)

## Prerequisites

- MongoDB Atlas account (for production database)
- Hosting accounts (Render/Vercel/Netlify or similar)
- Domain name (optional but recommended)
- Git repository
- Node.js knowledge

## Backend Deployment

### Option 1: Render (Recommended)

1. **Prepare MongoDB Atlas**
   - Create a free MongoDB Atlas account
   - Create a new cluster
   - Create a database user
   - Get your connection string (MongoDB URI)
   - Whitelist all IPs (0.0.0.0/0) for development

2. **Deploy to Render**
   - Push your code to GitHub
   - Sign up at [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
   - Configure:
     - Name: `kiddy-world-toys-backend`
     - Runtime: `Node`
     - Build Command: `npm install`
     - Start Command: `node server.js`
   - Add Environment Variables (see below)
   - Click "Deploy Web Service"

3. **Update CORS**
   - In `backend/server.js`, update CORS origin to your frontend domain
   - Redeploy after changes

### Option 2: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
cd backend
heroku create kiddy-world-toys-backend
```

4. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set JWT_EXPIRE=7d
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git push heroku main
```

### Option 3: Railway

1. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Deploy from GitHub
   - Select your repository
   - Add MongoDB service
   - Add backend service
   - Configure environment variables
   - Deploy

## Web Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Prepare for Deployment**
   - Update API URL in `web-frontend/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select `web-frontend` as root directory
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

3. **Add Custom Domain** (Optional)
   - In Vercel project settings
   - Add your domain
   - Update DNS records

### Option 2: Netlify

1. **Build Locally**
```bash
cd web-frontend
npm install
npm run build
```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect to GitHub for automatic deployments

### Option 3: GitHub Pages

1. **Update vite.config.js**
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

2. **Build and Deploy**
```bash
npm run build
# Deploy dist folder to gh-pages branch
```

## Mobile App Deployment

### Option 1: Expo Application Services (EAS)

1. **Install EAS CLI**
```bash
npm install -g eas-cli
```

2. **Configure EAS**
```bash
cd mobile-app
eas build:configure
```

3. **Update app.json**
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.kiddyworldtoys.app"
    },
    "android": {
      "package": "com.kiddyworldtoys.app"
    }
  }
}
```

4. **Update API URL**
   - In `mobile-app/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
   ```

5. **Build for iOS**
```bash
eas build --platform ios
```

6. **Build for Android**
```bash
eas build --platform android
```

7. **Submit to Stores**
```bash
eas submit --platform ios
eas submit --platform android
```

### Option 2: Expo Go (Development)

For testing without app store submission:
```bash
expo start
```
Scan QR code with Expo Go app on your device.

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kiddy-world-toys
JWT_SECRET=your_secure_random_secret_key_min_32_chars
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

### Web Frontend
No environment variables needed. Update API URL directly in `src/services/api.js`.

### Mobile App
No environment variables needed. Update API URL directly in `src/services/api.js`.

## Post-Deployment Steps

### 1. Seed Production Database
```bash
cd backend
node seed.js
```

### 2. Test All Features
- User registration and login
- Product browsing and search
- Add to cart and checkout
- Order placement
- Admin dashboard
- Mobile app functionality

### 3. Set Up Monitoring
- Use Render/Heroku logs for backend
- Use Vercel Analytics for frontend
- Set up error tracking (Sentry)

### 4. Configure Email Service
- Set up Nodemailer with your SMTP provider
- Configure email templates for order confirmations

### 5. Set Up Payment Gateway
- Create Stripe account
- Add Stripe keys to environment variables
- Test payment flow in test mode

### 6. Enable SSL/HTTPS
- Most platforms provide SSL automatically
- Ensure all API calls use HTTPS

### 7. Set Up CDN (Optional)
- Use Cloudflare for CDN and DDoS protection
- Configure caching rules

### 8. Backup Database
- Set up automated MongoDB backups
- Configure backup retention policy

### 9. Set Up CI/CD (Optional)
- Configure GitHub Actions for automatic testing
- Set up automatic deployments on push to main

## Troubleshooting

### Backend Issues
- **CORS Errors**: Update CORS origin in server.js
- **Database Connection**: Check MongoDB URI and IP whitelist
- **JWT Errors**: Verify JWT_SECRET is set correctly

### Frontend Issues
- **API Errors**: Verify API_BASE_URL is correct
- **Build Errors**: Clear node_modules and reinstall
- **Routing Issues**: Check Vite base configuration

### Mobile App Issues
- **Network Errors**: Ensure device can reach backend URL
- **Build Errors**: Check Expo CLI version compatibility
- **Permission Errors**: Review app.json permissions

## Security Best Practices

1. **Environment Variables**
   - Never commit .env files
   - Use strong, random secrets
   - Rotate secrets regularly

2. **API Security**
   - Enable rate limiting
   - Validate all inputs
   - Use HTTPS only
   - Implement CORS properly

3. **Database Security**
   - Use MongoDB Atlas security features
   - Enable authentication
   - Restrict network access
   - Regular backups

4. **Code Security**
   - Keep dependencies updated
   - Use npm audit
   - Implement proper error handling
   - Sanitize user inputs

## Scaling Considerations

### Backend
- Use load balancers for high traffic
- Implement caching (Redis)
- Use CDN for static assets
- Consider serverless functions for specific tasks

### Database
- Index frequently queried fields
- Use read replicas for read-heavy operations
- Implement connection pooling
- Monitor query performance

### Frontend
- Implement lazy loading
- Optimize images
- Use code splitting
- Enable compression

## Cost Optimization

### Free Tier Options
- MongoDB Atlas Free Tier (512MB)
- Render Free Tier (with sleep)
- Vercel Free Tier (100GB bandwidth)
- Expo Free Tier (build limits)

### Paid Tier Recommendations
- MongoDB Atlas Shared ($9/month)
- Render Starter ($7/month)
- Vercel Pro ($20/month)
- EAS Build ($99/month)

## Support

For deployment issues, refer to:
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Expo Documentation](https://docs.expo.dev)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
