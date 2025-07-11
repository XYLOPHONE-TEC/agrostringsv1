import React from 'react'
import Home from './pages/home'
import Dashboard from './pages/farmer-dashboard';
import ProductDashboard from './components/products-component';
import CarbonTracker from './components/carbon-tracker-farmer';
import { Routes, Route } from 'react-router-dom';
function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path="/tools/produce" element={<ProductDashboard />} />
          <Route path="/tools/carbon-tracker" element={<CarbonTracker />} />
    
    </Routes>
  )
}

export default App
