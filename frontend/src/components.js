import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

// Mock product data
const mockProducts = [
  // Electronics
  {
    id: 1,
    title: "Sony WH-1000XM4 Wireless Headphones",
    price: 299.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    brand: "Sony",
    rating: 4.8,
    reviews: 15234,
    description: "Industry-leading wireless noise canceling headphones with 30-hour battery life and premium sound quality.",
    features: ["Noise Canceling", "30-hour Battery", "Quick Charge", "Voice Assistant"],
    inStock: true,
    prime: true
  },
  {
    id: 2,
    title: "Apple iPad Pro 12.9-inch",
    price: 1099.99,
    originalPrice: 1199.99,
    image: "https://images.pexels.com/photos/1470167/pexels-photo-1470167.jpeg",
    category: "Electronics",
    brand: "Apple",
    rating: 4.9,
    reviews: 8765,
    description: "Powerful iPad Pro with M2 chip, stunning Liquid Retina XDR display, and all-day battery life.",
    features: ["M2 Chip", "12.9-inch Display", "5G Capable", "Apple Pencil Compatible"],
    inStock: true,
    prime: true
  },
  {
    id: 3,
    title: "iPod Classic MP3 Player",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1733786463192-ddf0b8830564",
    category: "Electronics",
    brand: "Apple",
    rating: 4.7,
    reviews: 3421,
    description: "Classic design MP3 player with premium sound quality and nostalgic appeal.",
    features: ["High-Quality Audio", "Large Storage", "Classic Design", "Long Battery Life"],
    inStock: true,
    prime: false
  },
  // Books
  {
    id: 4,
    title: "The Complete Guide to Programming",
    price: 45.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1604866830893-c13cafa515d5",
    category: "Books",
    brand: "Tech Publishing",
    rating: 4.6,
    reviews: 2341,
    description: "Complete programming guide covering modern languages and best practices for beginners and experts.",
    features: ["600+ Pages", "Code Examples", "Online Resources", "Updated 2024"],
    inStock: true,
    prime: true
  },
  {
    id: 5,
    title: "Modern Literature Collection",
    price: 32.99,
    originalPrice: 42.99,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    category: "Books",
    brand: "Classic Publishers",
    rating: 4.8,
    reviews: 1876,
    description: "Curated collection of modern literature classics from acclaimed authors worldwide.",
    features: ["5 Books", "Premium Binding", "Author Biographies", "Discussion Guide"],
    inStock: true,
    prime: true
  },
  // Fashion
  {
    id: 6,
    title: "Premium Cotton T-Shirt Collection",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
    category: "Fashion",
    brand: "StyleCo",
    rating: 4.5,
    reviews: 5432,
    description: "High-quality cotton t-shirts in various colors and sizes. Perfect for everyday wear.",
    features: ["100% Cotton", "Multiple Colors", "Pre-shrunk", "Machine Washable"],
    inStock: true,
    prime: true
  },
  {
    id: 7,
    title: "Colorful Casual Shirts Set",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68",
    category: "Fashion",
    brand: "ColorFul",
    rating: 4.4,
    reviews: 2187,
    description: "Set of 3 vibrant casual shirts perfect for any occasion. Comfortable and stylish.",
    features: ["3-Piece Set", "Wrinkle-Free", "Breathable Fabric", "Multiple Sizes"],
    inStock: true,
    prime: false
  },
  {
    id: 8,
    title: "Designer Clothing Bundle",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg",
    category: "Fashion",
    brand: "Designer Co",
    rating: 4.7,
    reviews: 3456,
    description: "Curated bundle of designer clothing items including shirts, pants, and accessories.",
    features: ["Designer Quality", "Mix & Match", "Premium Materials", "Gift Box"],
    inStock: true,
    prime: true
  },
  // Home & Garden
  {
    id: 9,
    title: "Modern Kitchen Essentials Set",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.pexels.com/photos/5616230/pexels-photo-5616230.jpeg",
    category: "Home & Garden",
    brand: "HomeChef",
    rating: 4.6,
    reviews: 4321,
    description: "Complete kitchen essentials set for modern homes. Everything you need to cook like a pro.",
    features: ["15-Piece Set", "Stainless Steel", "Dishwasher Safe", "Recipe Book"],
    inStock: true,
    prime: true
  },
  {
    id: 10,
    title: "Desktop Cactus Plant",
    price: 12.99,
    originalPrice: 16.99,
    image: "https://images.unsplash.com/photo-1504648492881-a5150829085c",
    category: "Home & Garden",
    brand: "GreenThumb",
    rating: 4.3,
    reviews: 876,
    description: "Low-maintenance desktop cactus plant perfect for offices and homes. Comes with decorative pot.",
    features: ["Low Maintenance", "Decorative Pot", "Air Purifying", "Perfect Gift"],
    inStock: true,
    prime: false
  },
  {
    id: 11,
    title: "Large Indoor Plant Collection",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1736181627607-9e89c392b14d",
    category: "Home & Garden",
    brand: "PlantLife",
    rating: 4.8,
    reviews: 2134,
    description: "Beautiful collection of large indoor plants perfect for living rooms and offices.",
    features: ["3 Plants Included", "Care Instructions", "Decorative Pots", "Air Purifying"],
    inStock: true,
    prime: true
  }
];

// TF-IDF Recommendation System
class TFIDFRecommendationEngine {
  constructor(products) {
    this.products = products;
    this.vocabulary = new Set();
    this.documentFreq = {};
    this.tfIdfVectors = {};
    this.buildVocabulary();
    this.calculateTFIDF();
  }

  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter(token => token.length > 2);
  }

  buildVocabulary() {
    // Build vocabulary from all product descriptions and titles
    this.products.forEach(product => {
      const tokens = this.tokenize(`${product.title} ${product.description} ${product.category} ${product.brand}`);
      tokens.forEach(token => this.vocabulary.add(token));
    });

    // Calculate document frequency for each term
    this.vocabulary.forEach(term => {
      this.documentFreq[term] = this.products.filter(product => {
        const tokens = this.tokenize(`${product.title} ${product.description} ${product.category} ${product.brand}`);
        return tokens.includes(term);
      }).length;
    });
  }

  calculateTF(tokens) {
    const tf = {};
    const totalTokens = tokens.length;
    
    tokens.forEach(token => {
      tf[token] = (tf[token] || 0) + 1;
    });

    // Normalize by total tokens
    Object.keys(tf).forEach(token => {
      tf[token] = tf[token] / totalTokens;
    });

    return tf;
  }

  calculateIDF(term) {
    return Math.log(this.products.length / (this.documentFreq[term] || 1));
  }

  calculateTFIDF() {
    this.products.forEach(product => {
      const tokens = this.tokenize(`${product.title} ${product.description} ${product.category} ${product.brand}`);
      const tf = this.calculateTF(tokens);
      const tfidfVector = {};

      Array.from(this.vocabulary).forEach(term => {
        const tfValue = tf[term] || 0;
        const idfValue = this.calculateIDF(term);
        tfidfVector[term] = tfValue * idfValue;
      });

      this.tfIdfVectors[product.id] = tfidfVector;
    });
  }

  cosineSimilarity(vector1, vector2) {
    const terms = Array.from(this.vocabulary);
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    terms.forEach(term => {
      const v1 = vector1[term] || 0;
      const v2 = vector2[term] || 0;
      
      dotProduct += v1 * v2;
      magnitude1 += v1 * v1;
      magnitude2 += v2 * v2;
    });

    const magnitude = Math.sqrt(magnitude1) * Math.sqrt(magnitude2);
    return magnitude === 0 ? 0 : dotProduct / magnitude;
  }

  getRecommendations(productId, count = 4) {
    const targetVector = this.tfIdfVectors[productId];
    if (!targetVector) return [];

    const similarities = this.products
      .filter(product => product.id !== productId)
      .map(product => ({
        product,
        similarity: this.cosineSimilarity(targetVector, this.tfIdfVectors[product.id])
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, count);

    return similarities.map(item => item.product);
  }
}

// Initialize recommendation engine
const recommendationEngine = new TFIDFRecommendationEngine(mockProducts);

// Header Component
const Header = ({ cart, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-900 text-white">
      {/* Top bar */}
      <div className="bg-gray-800 px-4 py-2 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <span>Deliver to New York 10001</span>
          </div>
          <div className="flex space-x-4">
            <span>Hello, Sign in</span>
            <span>Returns & Orders</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-yellow-400">amazon</div>
            <div className="text-xs text-gray-300">.com</div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 mx-8 max-w-2xl">
            <div className="flex">
              <select className="bg-gray-200 text-gray-900 px-3 py-2 rounded-l-md border-r">
                <option>All</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Amazon"
                className="flex-1 px-4 py-2 text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-r-md"
              >
                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            <div className="text-sm">
              <div className="text-xs text-gray-300">Returns</div>
              <div className="font-semibold">& Orders</div>
            </div>
            <Link to="/cart" className="flex items-center space-x-1">
              <div className="relative">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="text-sm">
                <div className="text-xs text-gray-300">Cart</div>
                <div className="font-semibold">${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-700 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center space-x-6">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-1 hover:bg-gray-600 px-2 py-1 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-sm font-semibold">All</span>
          </button>
          <Link to="/category/electronics" className="text-sm hover:bg-gray-600 px-2 py-1 rounded">Electronics</Link>
          <Link to="/category/books" className="text-sm hover:bg-gray-600 px-2 py-1 rounded">Books</Link>
          <Link to="/category/fashion" className="text-sm hover:bg-gray-600 px-2 py-1 rounded">Fashion</Link>
          <Link to="/category/home-garden" className="text-sm hover:bg-gray-600 px-2 py-1 rounded">Home & Garden</Link>
          <span className="text-sm hover:bg-gray-600 px-2 py-1 rounded cursor-pointer">Today's Deals</span>
          <span className="text-sm hover:bg-gray-600 px-2 py-1 rounded cursor-pointer">Customer Service</span>
        </div>
      </nav>
    </header>
  );
};

// Product Card Component
const ProductCard = ({ product, addToCart, showFullDetails = false }) => {
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square mb-4 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>
      
      <div className="space-y-2">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>

        {product.prime && (
          <div className="flex items-center space-x-1">
            <span className="text-blue-600 font-bold text-sm">prime</span>
            <span className="text-sm text-gray-600">FREE One-Day</span>
          </div>
        )}

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Home Page Component
export const HomePage = ({ cart, addToCart, searchQuery, setSearchQuery }) => {
  const featuredProducts = mockProducts.slice(0, 8);
  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', path: '/category/electronics' },
    { name: 'Books', image: 'https://images.unsplash.com/photo-1604866830893-c13cafa515d5', path: '/category/books' },
    { name: 'Fashion', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg', path: '/category/fashion' },
    { name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1504648492881-a5150829085c', path: '/category/home-garden' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find everything you need
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Millions of products at unbeatable prices
            </p>
            <Link
              to="/category/electronics"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* Today's Deals */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Today's Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Detail Page Component
export const ProductDetailPage = ({ cart, addToCart, searchQuery, setSearchQuery }) => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
            <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get recommendations using TF-IDF
  const recommendations = recommendationEngine.getRecommendations(product.id, 4);
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <Link to={`/category/${product.category.toLowerCase().replace(' & ', '-')}`} className="hover:text-blue-600">
            {product.category}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-blue-600 hover:underline cursor-pointer">Visit the {product.brand} Store</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {product.rating} out of 5 stars
                </span>
                <span className="text-gray-600">({product.reviews.toLocaleString()} ratings)</span>
              </div>

              <div className="border-t border-b border-gray-200 py-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-red-600">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                        Save -{discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
                
                {product.prime && (
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-blue-600 font-bold">prime</span>
                    <span className="text-sm text-gray-600">FREE One-Day Delivery</span>
                  </div>
                )}

                <div className="text-green-600 font-semibold mb-4">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-semibold">Qty:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-1"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200">
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold mb-3">About this item</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-gray-400 mt-1">•</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Products related to this item
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Search Results Page Component
export const SearchResultsPage = ({ cart, addToCart, searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  const searchResults = mockProducts.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Search results for "{query}"
          </h1>
          <p className="text-gray-600 mt-2">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              No results found for "{query}"
            </h2>
            <p className="text-gray-600 mb-8">
              Try searching with different keywords or browse our categories.
            </p>
            <Link
              to="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Category Page Component
export const CategoryPage = ({ cart, addToCart, searchQuery, setSearchQuery }) => {
  const { category } = useParams();
  const categoryName = category.replace('-', ' & ');
  
  const categoryProducts = mockProducts.filter(product =>
    product.category.toLowerCase() === categoryName.toLowerCase()
  );

  const categoryNames = {
    'electronics': 'Electronics',
    'books': 'Books',
    'fashion': 'Fashion',
    'home-garden': 'Home & Garden'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{categoryNames[category] || categoryName}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {categoryNames[category] || categoryName}
          </h1>
          <p className="text-gray-600">
            {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Cart Page Component
export const CartPage = ({ cart, removeFromCart, updateQuantity, searchQuery, setSearchQuery }) => {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1557821552-17105176677c"
              alt="Empty Cart"
              className="w-32 h-32 mx-auto mb-8 opacity-50"
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                    >
                      {item.title}
                    </Link>
                    <p className="text-gray-600 mt-1">{item.brand}</p>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium">Qty:</label>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="border border-gray-300 rounded px-2 py-1"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} each
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
            </div>
            
            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 mb-4">
              Proceed to Checkout
            </button>
            
            <Link
              to="/"
              className="block text-center text-blue-600 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};