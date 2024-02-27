import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Assuming AuthContext is in a separate file
import ProtectedRoute from './ProtectedRoute'; // Assuming ProtectedRoute is in a separate file
import LoginForm from './components/LoginForm';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import EditProduct from './components/EditProduct';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/register" element={<RegisterForm />} />
        <Route path="/products" element={<ProtectedRoute > <ProductList /></ProtectedRoute>} />
        <Route path="/addproducts" element={<ProtectedRoute > <ProductForm /></ProtectedRoute>} />
        <Route path="/editproducts/:id" element={<ProtectedRoute > <EditProduct /></ProtectedRoute>} />

      </Routes>
    </AuthProvider>
  );
};

export default App;
