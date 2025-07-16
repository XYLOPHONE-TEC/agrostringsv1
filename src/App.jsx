import React from 'react'
import Home from './pages/home'
import Dashboard from './pages/farmer-dashboard';
import BuyerDashboard from './pages/buyer-dashboard';

import { Routes, Route } from 'react-router-dom';
function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/buyer-dashboard' element={<BuyerDashboard />} />
   
    </Routes>
  )
}

export default App
