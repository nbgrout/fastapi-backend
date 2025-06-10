import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import About from './components/pages/About';
import ProductPage from './components/pages/ProductPage';
import { useCart } from './contexts/CartContext'; // ✅ Import from CartContext
import './App.css';

function App() {
  const { cartCount, incrementCart } = useCart(); // ✅ Use shared context

  return (
    <>
      <Navbar cartCount={cartCount} /> {/* ✅ Global cart count */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products onPurchase={incrementCart} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<ProductPage onPurchase={incrementCart} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
