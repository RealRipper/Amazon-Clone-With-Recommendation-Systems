import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import { 
  HomePage, 
  ProductDetailPage, 
  SearchResultsPage, 
  CartPage,
  CategoryPage 
} from './components';

function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                cart={cart} 
                addToCart={addToCart} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetailPage 
                cart={cart} 
                addToCart={addToCart}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            } 
          />
          <Route 
            path="/search" 
            element={
              <SearchResultsPage 
                cart={cart} 
                addToCart={addToCart}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            } 
          />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cart={cart} 
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            } 
          />
          <Route 
            path="/category/:category" 
            element={
              <CategoryPage 
                cart={cart} 
                addToCart={addToCart}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;