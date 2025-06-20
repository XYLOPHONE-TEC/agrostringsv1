// src/components/FarmersSection.jsx
import React from 'react'
import { FaUserCheck, FaPlayCircle, FaRegCheckSquare } from 'react-icons/fa'
import farmImg from '../assets/products-buyer.jpeg'
import small1 from '../assets/agro-string-tv.jpeg'
import small2 from '../assets/products-buyer2.jpeg'

export default function FarmersSection() {
  return (
    <section className="bg-gradient-to-b from-[#1a281f] to-[#222] text-white py-12">
      
      {/* Hero: Text + Circles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
        
        {/* Left column: text + mobile circles */}
        <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 py-8">
          
          {/* Mobile-only: Large circle above heading */}
          <div className="lg:hidden mb-6">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-gray-400 overflow-hidden mx-auto">
              <img src={farmImg} alt="Farmer" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Mobile-only: Abstract small circles behind text */}
          <div className="lg:hidden absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="absolute bottom-2 right-1/3 w-20 h-20 rounded-full overflow-hidden opacity-40 transform translate-x-1/4 translate-y-1/4">
              <img src={small1} alt="Gardener" className="w-full h-full object-cover filter brightness-90" />
            </div>
            <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full overflow-hidden opacity-40 transform -translate-x-1/4 translate-y-1/3">
              <img src={small2} alt="Crop" className="w-full h-full object-cover filter brightness-90" />
            </div>
          </div>

          <h2 className="relative z-10 text-3xl sm:text-4xl font-bold">
            For Farmers
          </h2>
          <p className="relative z-10 text-sm sm:text-base text-gray-200 px-4">
            Whether you're a smallholder or large-scale farmer, get the support you need to grow smarter, reduce losses and reach premium markets.
          </p>
          <a
            href="/farmers"
            className="relative z-10 mt-2 inline-block bg-yellow-400 text-black font-medium px-4 py-2 rounded-full hover:opacity-90 transition"
          >
            Farm with confidence →
          </a>
        </div>

        {/* Right column: desktop circles */}
        <div className="hidden lg:flex lg:w-1/2 w-full relative justify-end items-center">
          {/* Large circle */}
          <div className="w-64 h-64 rounded-full border-4 border-gray-400 overflow-hidden">
            <img src={farmImg} alt="Farmer in field" className="w-full h-full object-cover" />
          </div>
          {/* Top small circle */}
          <div className="absolute -top-4 left-1/4 w-24 h-24 rounded-full border border-white overflow-hidden">
            <img src={small1} alt="Gardener" className="w-full h-full object-cover" />
          </div>
          {/* Bottom small circle */}
          <div className="absolute -bottom-4 right-1/4 w-20 h-20 rounded-full border border-white overflow-hidden">
            <img src={small2} alt="Crop" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-xl font-semibold mb-4">
          From Seed to Market — It All Starts Here
        </h3>
        <p className="text-center text-sm text-gray-300 mb-8">
          Access verified farmlands, skilled farm, and essential inputs and services all through your personalized dashboard.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#111] p-6 flex flex-col items-center text-center space-y-4">
            <FaUserCheck size={32} className="text-white" />
            <h4 className="text-lg font-medium">Expert Agronomic Support</h4>
            <p className="text-sm text-gray-300">
              Get tailored advice from agronomists throughout the farming season.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-[#111] p-6 flex flex-col items-center text-center space-y-4">
            <FaPlayCircle size={32} className="text-white" />
            <h4 className="text-lg font-medium">Learn with AgroStrings TV</h4>
            <p className="text-sm text-gray-300">
              Watch educational videos on crop production, climate-smart farming, and market access right from your dashboard.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-[#111] p-6 flex flex-col items-center text-center space-y-4">
            <FaRegCheckSquare size={32} className="text-white" />
            <h4 className="text-lg font-medium">Farm Smarter with Data</h4>
            <p className="text-sm text-gray-300">
              Use weather forecasts, market insights, and crop-specific guides to improve yield.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
