// src/pages/Page.jsx
import React from 'react'
import Productheader from '../components/products-header'
import Productbuyer from '../components/products-buyers'
import Productseller from '../components/products-sellers'
import Footersection from '../components/footer'


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Productheader />
   <Productbuyer />
      <Productseller />
      <Footersection />

    </div>
  )
}

export default Home
