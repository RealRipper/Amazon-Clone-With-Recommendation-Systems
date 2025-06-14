# Amazon Clone - Deployment Guide for Vercel

## 🚀 Quick Deploy to Vercel

This Amazon clone with ML-powered product recommendations can be easily deployed to Vercel. Follow these steps:

### Prerequisites
- Node.js 18+ installed
- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (free tier available)

### Step 1: Prepare Your Code
1. Ensure your code is in a Git repository
2. The frontend code should be in the `/frontend` directory
3. Make sure `package.json` is in the frontend directory

### Step 2: Configure for Vercel
Create a `vercel.json` file in the root directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/frontend/build/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/build/index.html"
    }
  ]
}
```

### Step 3: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Import Project"
3. Connect your Git repository
4. Set the build settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`

### Step 4: Deploy via Vercel CLI (Alternative)
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Your username/team)
# - Link to existing project? No
# - Project name: amazon-clone
# - Directory: ./
# - Override settings? No
```

### Step 5: Environment Variables (if needed)
If you add backend functionality later, you can set environment variables in Vercel:
1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add your variables (e.g., `REACT_APP_API_URL`)

## 🎯 Features Included

### Core Amazon Clone Features
- **Homepage**: Hero section, categories, featured products
- **Product Detail Pages**: Full product information with images
- **Search Functionality**: Search across products by title, description, category
- **Shopping Cart**: Add/remove items, quantity management
- **Category Pages**: Browse products by category
- **Responsive Design**: Mobile-first approach

### ML-Powered Recommendations
- **TF-IDF Algorithm**: Analyzes product descriptions and titles
- **Content-Based Filtering**: Recommends similar products based on:
  - Product descriptions
  - Categories
  - Brand similarity
  - Feature overlap
- **Real-time Recommendations**: Shows related products on product detail pages

## 🔧 Technical Stack

- **Frontend**: React 19, React Router DOM 7.5.1
- **Styling**: TailwindCSS 3.4.17
- **Recommendation Engine**: Custom TF-IDF implementation
- **Data**: Mock product data (easily replaceable with real API)

## 📱 Mobile Optimization
- Fully responsive design
- Touch-friendly interface
- Optimized images
- Mobile navigation

## 🚀 Performance Features
- Image lazy loading
- Component-based architecture
- Efficient state management
- CSS-in-JS with TailwindCSS

## 🔄 Customization Guide

### Adding New Products
Edit the `mockProducts` array in `/frontend/src/components.js`:

```javascript
{
  id: 12,
  title: "Your Product Name",
  price: 99.99,
  originalPrice: 129.99,
  image: "your-image-url",
  category: "Your Category",
  brand: "Your Brand",
  rating: 4.5,
  reviews: 1234,
  description: "Product description for recommendations",
  features: ["Feature 1", "Feature 2"],
  inStock: true,
  prime: true
}
```

### Modifying Recommendation Algorithm
The TF-IDF engine can be customized in the `TFIDFRecommendationEngine` class:
- Adjust similarity thresholds
- Add more text preprocessing
- Include additional product attributes

### Styling Customizations
- Colors: Edit TailwindCSS classes
- Layout: Modify component structures
- Amazon branding: Update in components.js

## 🎨 Design Features
- Amazon-like color scheme (gray, yellow, orange)
- Star ratings system
- Prime badges
- Discount indicators
- Professional product cards
- Consistent spacing and typography

## 📊 Analytics Ready
The structure supports easy integration with:
- Google Analytics
- Facebook Pixel
- Custom tracking events

## 🔒 Security Considerations
- No sensitive data in frontend code
- Environment variables for API keys
- Sanitized user inputs
- HTTPS by default on Vercel

## 📞 Support
For deployment issues or customizations, the code is well-documented and modular for easy maintenance.

## 🚀 Go Live!
Your Amazon clone will be live at `https://your-project-name.vercel.app`

---

**Note**: This is a frontend-only implementation with mock data. For a production e-commerce site, you'll need to integrate with:
- Payment processing (Stripe, PayPal)
- User authentication
- Real product database
- Order management system
- Inventory tracking