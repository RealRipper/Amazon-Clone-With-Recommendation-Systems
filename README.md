# 🛒 Amazon Clone with ML-Powered Product Recommendations

A pixel-perfect Amazon clone featuring intelligent product recommendations powered by TF-IDF machine learning algorithm. Built with React and designed for seamless user experience.

![Amazon Clone Preview](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop)

## 🚀 Live Demo

🌐 **[View Live Demo](https://amazon-clone-with-ml.vercel.app/)**

## ✨ Key Features

### 🎯 **Perfect Amazon Replica**
- Authentic Amazon design with gray header and yellow accents
- Professional product cards with hover effects
- Star ratings, Prime badges, and discount indicators
- Responsive mobile-first design

### 🤖 **ML-Powered Recommendations**
- **TF-IDF Algorithm**: Custom implementation for content-based filtering
- **Smart Analysis**: Processes product titles, descriptions, categories, and brands
- **Real-time Suggestions**: Shows 4 related products on every product page
- **Cross-category Intelligence**: Finds meaningful product relationships

### 🛍️ **Complete E-commerce Experience**
- Multi-page application (Home, Product Details, Search, Cart, Categories)
- Shopping cart with quantity management and price calculations
- Advanced search functionality across all product attributes
- Category-based product browsing

### 📱 **Responsive Design**
- Mobile-optimized interface
- Touch-friendly interactions
- Consistent experience across all devices

## 🛠️ Technology Stack

- **Frontend**: React 19, React Router DOM 7.5.1
- **Styling**: TailwindCSS 3.4.17
- **ML Engine**: Custom TF-IDF recommendation system
- **State Management**: React Hooks
- **Build Tool**: Create React App
- **Deployment**: Vercel-ready

## 🏗️ Project Structure

```
/
├── frontend/
│   ├── src/
│   │   ├── App.js              # Main application component
│   │   ├── components.js       # All UI components & ML engine
│   │   ├── App.css            # Amazon-like styling
│   │   └── index.js           # React entry point
│   ├── public/                # Static assets
│   ├── package.json           # Dependencies and scripts
│   └── tailwind.config.js     # TailwindCSS configuration
├── vercel.json                # Vercel deployment config
├── DEPLOYMENT_GUIDE.md        # Detailed deployment guide
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git for version control
- Vercel account (free tier available)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/amazon-clone-ml.git
   cd amazon-clone-ml
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🌐 Deploy to Vercel - Step by Step

### Method 1: Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository

3. **Configure Build Settings**
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: yarn build
   Output Directory: build
   Install Command: yarn install
   ```

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project-name.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow prompts**
   ```
   ? Set up and deploy "~/frontend"? [Y/n] Y
   ? Which scope do you want to deploy to? [Your Username]
   ? Link to existing project? [y/N] N
   ? What's your project's name? amazon-clone-ml
   ? In which directory is your code located? ./
   ? Want to override the settings? [y/N] N
   ```

## ⚙️ Vercel Configuration Details

The project includes a pre-configured `vercel.json`:

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

## 🎯 ML Recommendation System

### How It Works

The recommendation engine uses **TF-IDF (Term Frequency-Inverse Document Frequency)** algorithm:

1. **Text Processing**: Analyzes product titles, descriptions, categories, and brands
2. **Vocabulary Building**: Creates a vocabulary from all product text
3. **TF-IDF Calculation**: Computes importance scores for each term
4. **Similarity Matching**: Uses cosine similarity to find related products
5. **Real-time Recommendations**: Displays 4 most similar products

### Example

When viewing **Sony WH-1000XM4 Headphones**:
- Analyzes: "Sony WH-1000XM4 Wireless Headphones Electronics noise canceling battery"
- Finds similar products: iPod (audio), iPad (electronics), other headphones
- Ranks by similarity score and displays top matches

## 🎨 Design System

### Colors
- **Primary**: #232f3e (Amazon Dark Gray)
- **Secondary**: #ffd814 (Amazon Yellow)
- **Accent**: #ff9900 (Amazon Orange)
- **Text**: #0f1111 (Amazon Black)

### Typography
- **Font Family**: "Amazon Ember", Arial, sans-serif
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with optimal line height

## 📊 Features Deep Dive

### 🏠 Homepage
- Hero section with call-to-action
- Category grid with overlay text
- Featured products carousel
- Today's deals section

### 🔍 Product Search
- Real-time search across all product attributes
- Search result highlighting
- Category filtering
- Sort options

### 📦 Product Details
- High-quality product images
- Detailed descriptions and features
- Customer ratings and reviews
- **ML-powered related products**
- Add to cart functionality

### 🛒 Shopping Cart
- Item quantity management
- Price calculations with tax
- Remove items functionality
- Checkout process simulation

## 🔧 Customization Guide

### Adding New Products

Edit `mockProducts` array in `/frontend/src/components.js`:

```javascript
{
  id: 12,
  title: "Your Product Name",
  price: 99.99,
  originalPrice: 129.99,
  image: "https://your-image-url.com/image.jpg",
  category: "Your Category",
  brand: "Your Brand",
  rating: 4.5,
  reviews: 1234,
  description: "Detailed product description for ML analysis",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  inStock: true,
  prime: true
}
```

### Modifying Recommendations

The TF-IDF engine can be customized in the `TFIDFRecommendationEngine` class:

```javascript
// Adjust number of recommendations
getRecommendations(productId, count = 6) // Default is 4

// Modify similarity threshold
const similarities = products
  .filter(similarity => similarity > 0.1) // Add threshold
```

### Styling Changes

Update TailwindCSS classes or modify `/frontend/src/App.css` for custom styles.

## 🚀 Performance Optimizations

- **Image Optimization**: Responsive images with proper loading
- **Code Splitting**: Component-based architecture
- **Efficient State Management**: React hooks with optimal re-renders
- **CSS Optimization**: TailwindCSS purging for minimal bundle size

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive grid layouts
- Mobile navigation menu
- Optimized images for different screen sizes

## 🔒 Security Considerations

- No sensitive data in frontend code
- Environment variables for configuration
- Sanitized user inputs
- HTTPS by default on Vercel

## 🧪 Testing

The application has been thoroughly tested for:
- ✅ Cross-browser compatibility
- ✅ Mobile responsiveness
- ✅ ML recommendation accuracy
- ✅ Shopping cart functionality
- ✅ Search and navigation
- ✅ Performance optimization

## 📈 Future Enhancements

### Phase 1 (Backend Integration)
- User authentication system
- Real product database
- Payment processing (Stripe/PayPal)
- Order management

### Phase 2 (Advanced ML)
- Collaborative filtering
- User behavior analysis
- A/B testing for recommendations
- Personalized suggestions

### Phase 3 (Analytics)
- Google Analytics integration
- Custom event tracking
- Performance monitoring
- User journey analysis

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Amazon for design inspiration
- React team for the amazing framework
- TailwindCSS for utility-first CSS
- Vercel for seamless deployment
- Machine Learning community for TF-IDF algorithms

## 📞 Support

If you have any questions or run into issues:

1. Check the [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions
2. Open an issue on GitHub
3. Review the code comments for implementation details

---

**⭐ Star this repository if you found it helpful!**

**🚀 [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/amazon-clone-ml)**

---

Made with ❤️ and powered by Machine Learning
