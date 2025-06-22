// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Products from './pages/products.jsx'
import Contactus from './pages/contactus.jsx'
import Partners from './pages/partners.jsx'
import Getstarted from './pages/get-started.jsx'
export default function App() {
  return (
    <div className="App">

      
      <Routes>

        <Route path="/" element={<Home />} />
         <Route path="/products" element={<Products />} />
         <Route path="/contact" element={<Contactus />} />
         <Route path="/partners" element={<Partners />} />
         <Route path="/get-started" element={<Getstarted />} />
      </Routes>
    </div>
  )
}
