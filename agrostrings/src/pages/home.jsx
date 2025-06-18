// src/pages/Page.jsx
import React from 'react'
import Header from '../components/header'
import FeaturesSection from '../components/features-section'

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <FeaturesSection />
    </div>
  )
}

export default Page
