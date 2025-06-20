// src/pages/Page.jsx
import React from 'react'
import Productheader from '../components/products-header'
import Productbuyer from '../components/products-buyers'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Productheader />
   <Productbuyer />

    </div>
  )
}

export default Home
