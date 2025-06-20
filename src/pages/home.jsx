// src/pages/Page.jsx
import React from 'react'
import Header from '../components/header'
import FeaturesSection from '../components/features-section'
import TestmonialSection from '../components/footer-testimonials'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <FeaturesSection />
         <TestmonialSection />

    </div>
  )
}

export default Home
