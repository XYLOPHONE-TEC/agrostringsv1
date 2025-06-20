// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Products from './pages/products'

export default function App() {
  return (
    <div className="App">

      
      <Routes>

        <Route path="/" element={<Home />} />
         <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  )
}
